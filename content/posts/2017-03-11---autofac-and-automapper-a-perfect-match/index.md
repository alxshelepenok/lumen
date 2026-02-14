---
title: Autofac and Automapper - A perfect match
date: "2017-03-11T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/autofac-and-automapper-a-perfect-match"
category: "programming"
tags:
  - "development"
description: "With hexagonal and onion architectures, clean code, domain-driven-design, command query responsibility segragation Dependency Injection or Inversion of Control"
socialImage: "./image.jpg"
---


![Add List](./automapper❤️autofac.png)

With hexagonal and onion architectures, clean code, domain-driven-design, command query responsibility segragation Dependency Injection or Inversion of Control comes in very handy.

One thing I came across while working with [Autofac](https://autofac.org/) and [Automapper](http://automapper.org/) is, how good the play together.

Imagine a basic setup where we handle an incoming request viewmodel, map it to an input command for a command handler, but the mapping is a little bit more complicated and we already want to use a service from the container during the mapping process. Automapper provides us with [`ITypeConverter`](https://docs.automapper.org/en/stable/Custom-type-converters.html) and [`IValueResolver`](https://docs.automapper.org/en/stable/Custom-value-resolvers.html) interfaces for more advanced mapping tasks.


For a mapping like this

```csharp

var target = _mapper.Map<TargetType>(new SourceType());

```

We could use the following SourceType to TargetType `TypeConverter`


```csharp
public class SourceToTargetTypeConverter 
                    : ITypeConverter<SourceType, TargetType>
{
    public TargetType Convert(SourceType source, TargetType destination, ResolutionContext context)
    {
        ...
        return targetObject;
    }
}
```

It could be quite handy to have access to the Autofac container and request some `IFancyService` inside our `SourceToTargetTypeConverter`


```csharp
public class SourceToTargetTypeConverter 
                    : ITypeConverter<SourceType, TargetType>
{
    private readonly IFancyService _service;

    public SourceToTargetTypeConverter(IFancyService service) {
        _service = service;  // require IFancyService from the container
    }

    public TargetType Convert(
                  SourceType source, 
                  TargetType destination, 
                  ResolutionContext context)
    {
        return new TargetType
            {
                // use the service
                Thing = _service.GetAwesomeThing() 
            };
    }
}
```

For this we first need to create a `MappingProfile` that configures our `SourceToTargetTypeConverter`

```csharp
public class FancyProfile : AutoMapper.Profile
{
  public FancyProfile()
  {
    CreateMap<SourceType, TargetType>()
      .ConvertUsing<SourceToTargetTypeConverter>();
  }
}
```

Later, when the container gets built we can use the assembly scanning feature of Autofac and register all `AutoMapper.Profile` types auomatically.


```csharp
internal class MapperModule : Autofac.Module
{
    
  protected override void Load(ContainerBuilder builder)
  {

    builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly())
              .AssignableTo<Profile>()
              .As<Profile>()
              .AutoActivate();

    ...
  }
}
```

Now comes the magic trick: everytime when a mapper is resolved, we need to resolve a `MapperConfiguration` first. Because all `AutoMapper.Profile` types have been already registered in the container before we are now able to get all `AutoMapper.Profile` by resolving `context.Resolve<IEnumerable<Profile>>()` - another nice feature of Autofac.

When the actual Mapper is then created using the `config.CreateMapper(Func<Type, object> serviceCtor)` overload, Autofac will fulfill all dependencies defined in tha Automapper converters.


```csharp

  // Get all Profiles and add them to the MapperConfiguration
  builder.Register(context =>
  {
      var profiles = context.Resolve<IEnumerable<Profile>>();
      var config = new MapperConfiguration(x =>
      {
        foreach (var profile in profiles)
        {
          x.AddProfile(profile);
        }
      });

      return config;
  }).SingleInstance().AutoActivate().AsSelf();


  // Resolve the MapperConfiguration and call CreateMapper()  
  builder.Register(context =>
  {
    var ctx = context.Resolve<IComponentContext>();
    var config = ctx.Resolve<MapperConfiguration>();
    return config.CreateMapper(
      t => ctx.Resolve(t) // The magic is happening here: Autofac will now fulfill all dependcies defined in MapperConfigurations
    );
  });
```

Works pretty nice that way and it perfectly fits into an hexagonal or onion architecture.

Btw, thanks Mario for pointing me to this idea 😘


**Update 2021**: 
- New automapper version
- Find the updated code in the [Github repo](https://github.com/mloitzl/AutofacAndAutomapper)