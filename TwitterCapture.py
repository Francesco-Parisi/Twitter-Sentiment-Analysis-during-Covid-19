import tweepy
import json
import pymongo
import datetime
import requests
import os
import re
from pymongo import MongoClient
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from deep_translator import MyMemoryTranslator

### Formattazione Retweet
def format_tweet(string):
    string = string.replace('RT', '')
    string = string.replace("\n", " ")
    return string

### Formattazione Tweets
def cleanTweet(string):
    string = string.replace('#', '')
    string = string.replace('\n', '')
    string = string.replace('@', '')
    string = re.sub('http://\S+|https://\S+', '', string)
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               u"\U00002702-\U000027B0"
                               u"\U000024C2-\U0001F251"
                               "]+", flags=re.UNICODE)
    string = emoji_pattern.sub(r'', string)
    return string

### Tweet Translator
def translatorTweet(tweet):
    translated = MyMemoryTranslator(source="it", target="en").translate(tweet)
    return translated

### Database Connection
client= MongoClient("mongodb+srv://dbUser:dbUser@cluster0.lcwhz.mongodb.net/ProgReti?retryWrites=true&w=majority")
db=client['ProgReti']
collection=db['Tweet']

#### Twitter Developer Credentials
consumerKey = '577Wyn7YJ15g9QreB4FhtdeFv'
consumerSecret = 'HEHaDmj4gpmEtZdcVpXeA4KYRcMDwMqpaHYLdrP6ui2o25NtA9'
accessToken = '1327570641617362945-a3By7auPR9L6jmvFRoqfzJ9BLMILWE'
accessTokenSecret = 'Ltl1db5rS52Yukcozmjlpiok4JVDTp4i411JMT1m4oPtQ'
auth = tweepy.OAuthHandler(consumerKey, consumerSecret)
auth.set_access_token(accessToken, accessTokenSecret)
api = tweepy.API(auth,wait_on_rate_limit=True)

data = {"documents": []}
tweetSentiment = {"documents": []}

# Inserimento Hashtag
searchTerm = input("Enter Keyword/Tag to search about: ")
analyzer = SentimentIntensityAnalyzer()
rt_count = 0

print("Start Tweet Capturing..")
for tweet in tweepy.Cursor(api.search,q=searchTerm, lang="it", since="2020-11-07", until="2020-11-14", result_type="mixed", tweet_mode="extended").items(200):
    if tweet.full_text.startswith("RT @") == True:
        tweet.full_text = format_tweet(tweet.full_text)
        retweet_status = True
        rt_count += 1
    else:
        retweet_status = False
    print(tweet.created_at, tweet.full_text)
    p2 = ["", tweet.full_text]
    hast = ""
    a = tweet.full_text.count("#")
    if (a >= 0):

        for c in range(a):
            p1 = p2[1].split("#", 1)
            try:
                if (p1[1].find(" ") < 0):
                    hast += "#" + p1[1]
                    hast = hast.replace("\n", "")
                    break
                else:
                    p2 = p1[1].split(" ", 1)
                    hast += "#" + p2[0]
                    hast = hast.replace("\n", "")
            except IndexError:
                hast+="#"+p1[0]
    ddata=datetime.datetime.strptime(str(tweet.created_at),'%Y-%m-%d %H:%M:%S')
    tweet.full_text = cleanTweet(tweet.full_text)
    trans = translatorTweet(tweet.full_text)
    sentiment = analyzer.polarity_scores(trans)
    tt={
        "id": tweet.id,
        'Hashtag': searchTerm,
        "Retweet": retweet_status,
        "data":str(ddata),
        "testo":tweet.full_text,
        "hashtags": hast,
        "score": sentiment
    }
    data['documents'].append({"language": "it", "id": tweet.id, "text": tweet.full_text})
    tweetSentiment['documents'].append(({"language": "it", "id": tweet.id, "text": trans, "score": sentiment}))
    collection.insert_one(tt)


with open('week.json', 'w', encoding='utf8') as outfile:
    json.dump(data, outfile, ensure_ascii=False)

with open('result.json', 'w', encoding='utf8') as outfile: #'a' per aggiungere alla fine
    json.dump(tweetSentiment, outfile, ensure_ascii=False)
