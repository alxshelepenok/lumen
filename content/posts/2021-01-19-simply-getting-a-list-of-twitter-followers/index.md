---
title: Simply getting a list of Twitter followers
date: 2021-01-19T00:58:40.996Z
template: post
draft: false
slug: cleaning-it-up
category: roboticprocessautomation
description: Cleaning things up a bit, starting with Twitter
socialImage: /media/050-binary.png

---
## Problem Statement:

As someone who would like better control of the tweets I see from people that I am interested in; I would like to have a list of people that I am currently following in a spreadsheet so that I can group similar people into lists and have a better user experience. 

## Solution

### Steps:
1. Install `jq`
1. Install `twurl`
1. Get Twitter API Developer credentials
1. Configure `twurl`
1. Input following API request in the terminal
    

>(replacing `0123456789` with the UserID you're interested in and `test123.txt` with whatever you want to name the file) 

    twurl "/2/users/0123456789/following?user.fields=created_at,description,id,location,name&max_results=1000" | jq > test123.txt

(**Optional**) Take the JSON text that is in your file and input it into the JSON to CSV converter.

### Helpful resources
* [Twitter ID finder](https://tweeterid.com/)
* [Konklone - convert JSON to CSV](https://konklone.io/json/)
* [A Guide To Twurl and the Twitter API](https://medium.com/@SamSchmir/a-guide-to-the-twitter-api-and-twurl-8711466a0635)
* [How to use twurl to quickly test the Twitter API](https://dev.to/twitterdev/how-to-use-twurl-to-quickly-test-the-twitter-api-4n48)
* [Unfollow everyone on twitter.com](https://gist.github.com/JamieMason/7580315)
* [Twitter API recipes for twurl +jq, and other useful Twitter code snippets and tools](https://gist.github.com/andypiper/32bdb4c7f0b8d65385fc7c8fa3988083)
* [Get UserID Following](https://developer.twitter.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-following)
* [Introducing New Twitter API](https://blog.twitter.com/developer/en_us/topics/tools/2020/introducing_new_twitter_api.html) 


#### Room for improvement

* Having this happen directly in a spreadsheet application (Google Sheets, AirTable, etc)


#### Additional problems this can help solve

* Increase engagement
* Seeing threads from other people
* See more content from people without having to follow them
* Keep my ratio of following to followers low

#### What I learned/Roadblocks
* The 1.1 version API returns people that I am **not** actually following
* When I used the pagination, it split up the fields, so that when formatted into a .csv directly, the fields didn't line up

## Conclusion

Wow, this proved to be a lot harder than I thought. I thought this would be as easy as Googling for a way to export list of followers and it turned into an intro tutorial into the Twitter API. It would have been a whole lot quicker to just scroll on the following list long enough to get everyone on one page, copying and then pasting and cleaning up the format — but I would not have learned as much or felt nearly as accomplished.

| Hypothesis       | Expected Result | Actual Result |
| ---------------- | :---------------: | :-------------: |
| Difficulty       | Easy            | Hard          |
| Level of Effort  | Low             | High      |
| Learning         | Low             | Moderate      |
| Length of effort | 45 minutes      | 16hrs         |

## Skills I improved

| Skill                         | Initial Proficiency | Resulting Proficiency | Resource                                                                                                                                          |
| -------------------- | :---------------: | :--------------: | :---------------: |
| Linux - cat                   | 0                 | 4                   | [How to combine files using the cat command in linux](https://www.howtogeek.com/278599/how-to-combine-text-files-using-the-cat-command-in-linux/) |
| Linux - piping                | 1                 | 3                   |                                                                                                                                                   |
| GitHub- searching gists       | 0                 | 8                   |  [GitHub Gist Search](https://gist.github.com/search)                                                                                                                                                 |
| GitHub- markdown              | 6                 | 7                   | [GitHub Working with Tables](https://www.pluralsight.com/guides/working-tables-github-markdown)                                                   |
Twitter API (Rate Limit) | 0                 | 8                   | [Twitter Developer Rate Limits](https://developer.twitter.com/en/docs/twitter-api/rate-limits) |
Twitter API Paging Cursoring | 0                 | 2                   |[Twitter Developer Pagination] (https://developer.twitter.com/en/docs/twitter-api/pagination) |

### Long list of failures:

* **Using Postman** Not sure what happened here. I swear I was using the authorization tokens appropriately, but I kept on getting 404 errors. Nothing seemed to work, but I am not going to give up forever, but after trying for a little over an hour, I have to give up for now. 
* **Using Twit** So promising, but no luck. Seems like this would have worked for just about everything that it is meant to do, *except* for what I am trying to do. Womp Womp
* **Writing code with Tweep** This probably would have worked if I had done it properly, I’m pretty sure. But I didn’t, so it is getting added to this list of failures. I had played around with this the last week when I was starting to use python; but completely forgot that it wasn’t a command-line tool so I thought it was trash because I had just tried using Twit, so when it didn’t work like that, I figured it didn’t work either. Aka – this was a user error and I’ll probably go back someday and use this method.  https://www.geeksforgeeks.org/python-api-friends-in-tweepy/
* **Using the Version 1.1 API (friend search)** Didn't realize this was the case until I thought I had solved this by using a combo of `twurl` + `"/1.1/friends/list.json?screen_name=its_a_lisa?cursor=-1&skip_status=true&include_user_entities=false" | jq > test123.tx`+ `cursoring` + `json -> .csv` + `cat all the .csv`. Once I did that, I navigated to the `following` column and realized there were people in that list that had the value `false`. I validated that I wasn't following them by spot checking a few through the interface. 
* **Using the Version 2.0 API (pagnation)**   Still trying to figure out how to get it to work; having a lot of problems and at this point for what I'm doing, it is easier to do it in two tries and not have to worry about combining any lists because that is what is breaking. 

    
   > twurl "/2/users/201492612/following?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified&tweet.fields=created_at&max_results=100&pagination_token=LC5IGF1M7F01AZZZ" | jq > alyssa_following_v2_10.txt

* **Chrome Extension - Webscraper.io** I didn't put too much effort into it. I followed the instructions and it wasn't obvious how it should work, so I moved on pretty quickly. I'm about 56% positive that it might have worked, but I just didn't know where to look to see the results.
* **A sketchy Google Sheets with scripts** Ya know... when you get to that point, where you just want it to work, to *just freaking work* !? Ya, that is what happened here -- there is a good chance that I even got to it from the other article that was like "Hey! You, ya, here look at this thing! It's sketchy!!" but I only read the first sentence. 

### Bonus: Semi-comical mistakes I made

* Left an incorrect username in a search field in like step 2; but didn't notice until I got done and was reviewing the list of followers and didn't recognize any of them
* I thought the Twitter limit was 100 instead of the accurate 1000 -- so for 3 different times (the wrong user, APIv1.1, APIv2.0) I did 10x the amount of work than I actually needed to.

