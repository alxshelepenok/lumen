---
title: "Variance and covariance explained with C#"
date: "2025-08-25T19:08:00.000Z"
template: "post"
draft: false
slug: "/posts/variance-and-covariance-explained-with-csharp"
category: "programming"
tags:
  - csharp
  - generics
  - typescript
  - variance
description: "A deep dive into variance and covariance with modern C# examples. Featuring Orwell’s Animal Farm, dependency injection scenarios, and a short detour into TypeScript."
---

The other day a colleague asked me about the difference between variance and covariance in C#.
I smiled, and realized I probably owed him an article.

Variance in programming has a reputation for being boring theory reserved for academic types and Stack Overflow answers from 2011. But it is *not*. It’s one of those topics that silently runs the type system you rely on every day. And once you grasp it, you’ll spot opportunities to write cleaner, more composable code.

---

## The Gentle Theory Bit

Let’s start with crisp definitions:

- **Variance** describes how subtype relationships behave when a type parameter is involved.
- **Covariance** means “I can go upwards in the inheritance tree safely.” If `Pig` inherits `Animal`, then `IEnumerable<Pig>` can be treated as `IEnumerable<Animal>`.
- **Contravariance** means the opposite direction. It allows safe handling of more general inputs: if `Pig` is an `Animal`, then `IComparer<Animal>` can also be an `IComparer<Pig>`.

Or, put differently:  
- **`out` = covariance (outputs)**  
- **`in` = contravariance (inputs)**  

Here’s a neat mnemonic: the `N` in `in` belongs to Co**N**travariance. The `out` keyword simply points to co**V**ariance, as it describes output positions.

Two classic examples from .NET’s BCL should be familiar:  

```cs
public interface IEnumerable<out T> { ... }
public interface IComparer<in T> { ... }
```

Why these choices?  
- `IEnumerable<T>` produces sequence elements, so it’s **covariant**.  
- `IComparer<T>` consumes elements to compare them, so it’s **contravariant**.  

---

## Our Animal Hierarchy

First, the characters:

```cs
public abstract class Animal
{
    public string Name { get; }
    protected Animal(string name) => Name = name;
    public abstract void Speak();
}

public class Pig : Animal
{
    public Pig(string name) : base(name) { }
    public override void Speak() => 
        Console.WriteLine($"{Name}: Oink!");
}

public class Horse : Animal
{
    public Horse(string name) : base(name) { }
    public override void Speak() => 
        Console.WriteLine($"{Name}: Neigh!");
}

var napoleon = new Pig("Napoleon");
var boxer = new Horse("Boxer");
```
---

## Covariance With `out`

Covariance shines when you *produce* (return) something. The classic example:  
`IEnumerable<out T>` is covariant. This means you can assign a collection of derived types to a collection of base types:


```cs
IEnumerable<Pig> pigs = new List<Pig> { napoleon };
IEnumerable<Animal> animals = pigs; // Works thanks to covariance

foreach (var animal in animals)
{
    animal.Speak();
}
```

Here the variance lets us *consume* the sequence as its base type. `Napoleon` still squeals as expected.

### Async Streams (`IAsyncEnumerable<out T>`)

With async streams introduced in C# 8, the variance principle shines:  

```cs
async IAsyncEnumerable<Dog> GetDogsAsync() { ... }

// Covariance lets you assign to a more general type:
IAsyncEnumerable<Animal> animals = GetDogsAsync();
```

Without covariance, this neat and type-safe upcasting wouldn’t be allowed.  

### Read-Only Collections

Read-only interfaces are typically covariant since they only expose data:  

```cs
IReadOnlyList<Dog> dogs = ...
IReadOnlyList<Animal> animals = dogs; // perfectly valid due to covariance
```

`IReadOnlyList<out T>` can produce values but not consume them, so safe covariance applies.  

Contrast with mutable collections:

```cs
IList<Animal> animals = new List<Dog>(); // Error: IList<T> is invariant
animals.Add(new Cat());                  // This would break type safety, so disallowed
```

### Async LINQ Extensions

Async LINQ operators use variance too:  

```cs
await foreach (Animal a in GetDogsAsync().OfType<Animal>())
{
    ...
}
```

Here, covariance in `IAsyncEnumerable<out T>` allows seamless upcasting during enumeration.  

---

## Contravariance With `in`

Contravariance is the mirror world. It occurs where a type parameter only appears as an input.  
Imagine we have a farm-wide announcer whose sole job is to talk to animals:


```cs
public interface IAnnouncer<in T>
{
    void Announce(T animal);
}

public class LoudAnnouncer : IAnnouncer<Animal>
{
public void Announce(Animal animal)
    => Console.WriteLine($"Announcing: {animal.Name} is here!");
}
```

Now, thanks to contravariance, we can reuse `IAnnouncer<Animal>` even if the code expects a `IAnnouncer<Pig>`:


```cs
IAnnouncer<Pig> pigAnnouncer = new LoudAnnouncer();
pigAnnouncer.Announce(napoleon);
```

The `in` keyword makes this possible: an announcer that works for “all animals” can also be used where “only pigs” are requested.

---

## Dependency Injection And Contravariance

Variance becomes especially powerful when combined with dependency injection (DI).

Imagine you have a service that requires an announcer *just* for pigs:

```cs
public class PigShow
{
    private readonly IAnnouncer<Pig> _announcer;

    public PigShow(IAnnouncer<Pig> announcer) 
    {
        _announcer = announcer;
    }

    public void Run(Pig pig) => 
        _announcer.Announce(pig);
}

```
You don’t want to write multiple announcers for every animal type. Instead, you register a single `IAnnouncer<Animal>` in DI:

```cs
services.AddSingleton<IAnnouncer<Animal>, LoudAnnouncer>();
services.AddTransient<PigShow>();
```

Now DI happily resolves `IAnnouncer<Pig>` requests using the `IAnnouncer<Animal>` implementation, because contravariance made that conversion legal.

This is both elegant and practical: a single implementation scales across multiple injected scenarios.

### Comparers and Dependency Injection

Contravariance comes in handy when you consume values, for example with comparers:  

```cs
class AnimalNameComparer : IComparer<Animal>
{
    public int Compare(Animal? x, Animal? y) =>
        string.Compare(x?.Name, y?.Name, StringComparison.Ordinal);
}

IComparer<Dog> dogComparer = new AnimalNameComparer();
```

This compiles because `IComparer<T>` is contravariant (`in T`): a comparer for `Animal` can also handle `Dog`. Handy for registering services in dependency injection containers for base types while resolving derived types.  

---

## The Classic Pitfalls

Variance doesn’t come for free:

- Covariance (`out`) applies only when you *return* data, never when you need to *put* something inside.
- Contravariance (`in`) works when consuming inputs, not producing outputs.

### Why isn’t Everything Covariant or Contravariant?

Variance is only safe if the interface respects its output/input constraints. If an interface both consumes and produces `T`, the compiler forbids variance to prevent runtime type errors.  

Example:  

```cs
IList<Animal> animals = new List<Dog>(); // Compilation error
```

Allowing variance here would mean you could insert a `Cat` into a list of `Dog`, breaking runtime safety.  

### Arrays are covariant

C# allows this:

```cs
string[] strings = new string[] { "a", "b", "c" };
object[] objects = strings; // ✅ Allowed, because arrays are covariant
```

So an array of string can be treated as an array of object.
That’s covariance: string → object (derived → base).

Why is this unsafe?

At runtime you can now do:

```cs
object[] objects = new string[2];
objects[0] = "hello";   // fine
objects[1] = 42;        // ❌ runtime error!
````

At compile time, the compiler thinks this is fine (42 is an object).
But at runtime, the actual array is a string[], and 42 is not a string.
So the runtime throws an ArrayTypeMismatchException.
👉 This means covariance of arrays breaks type safety.

---

## Variance In JavaScript And TypeScript

In JavaScript, you don’t have variance. Everything is duck typing and vibes.  
But in TypeScript, variance sneaks in through assignability rules:

```typescript
interface Announcer<T> {
    announce(animal: T): void;
}

let pigAnnouncer: Announcer<Pig>;
let animalAnnouncer: Announcer<Animal>;

````

By default, TypeScript treats function parameters as *bivariant* (both co- and contravariant-ish), which is convenient but not always type-safe.  
Strict mode (`strictFunctionTypes`) nudges it closer to C#’s model:  

- Return types are **covariant** – it’s safe for a `Pig` to be returned where `Animal` is expected.  
- Parameter types are **contravariant** – you can provide an `Announcer<Animal>` if someone asks for an `Announcer<Pig>`.

So the concepts map over neatly, but TypeScript hides most of the painful corners for you. Meanwhile, C# makes you explicitly sprinkle `in` and `out` keywords like salt on your generics.

---

## Conclusion

Variance is one of those “once seen, can’t be unseen” aspects of type systems.  

- **Covariance (`out`)** lets you use derived collections as base collections.  
- **Contravariance (`in`)** lets you use general consumers in more specific contexts.  
- Dependency injection frameworks love contravariance.  
- Even JavaScript/TypeScript play in this space, albeit more loosely.

And in case you forget: just remember the `N` in `in` belongs to Co**N**travariance.