import tweepy
import pymongo
import datetime,requests,os,re
from pymongo import MongoClient

### Formattazione Tweets
def cleanTweet(string):
    string = string.strip()
    string = string.replace('#', ' ')
    string = string.replace('\n', '')
    string = re.sub('(\@(\w)*: )|(\@(\w)*)*', '', string)
    string = re.sub('http://\S+|https://\S+', '', string)
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               u"\U00002500-\U00002BEF"  # chinese char
                               u"\U00002702-\U000027B0"
                               u"\U00002702-\U000027B0"
                               u"\U000024C2-\U0001F251"
                               u"\U0001f926-\U0001f937"
                               u"\U00010000-\U0010ffff"
                               u"\u2640-\u2642"
                               u"\u2600-\u2B55"
                               u"\u200d"
                               u"\u23cf"
                               u"\u23e9"
                               u"\u231a"
                               u"\ufe0f"  # dingbats
                               u"\u3030"
                               "]+", flags=re.UNICODE)
    string = emoji_pattern.sub(r'', string)
    return string

### Formattazione Hashtags
def cleanHashtags(string):
    string = string.replace('\n', '')
    string = re.sub('(\@(\w)*: )|(\@(\w)*)*', '', string)
    string = re.sub('http://\S+|https://\S+', '', string)
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               u"\U00002500-\U00002BEF"  # chinese char
                               u"\U00002702-\U000027B0"
                               u"\U00002702-\U000027B0"
                               u"\U000024C2-\U0001F251"
                               u"\U0001f926-\U0001f937"
                               u"\U00010000-\U0010ffff"
                               u"\u2640-\u2642"
                               u"\u2600-\u2B55"
                               u"\u200d"
                               u"\u23cf"
                               u"\u23e9"
                               u"\u231a"
                               u"\ufe0f"  # dingbats
                               u"\u3030"
                               "]+", flags=re.UNICODE)
    string = emoji_pattern.sub(r'', string)
    return string


### Database Connection
client= MongoClient("mongodb+srv://dbUser:dbUser@cluster0.lcwhz.mongodb.net/ProgReti?retryWrites=true&w=majority")
db=client['ProgReti']
collection=db['Week-3']

#### Twitter Developer Credentials
consumerKey = '4SUob4rkvJ3udNkdoWhgWB8w6'
consumerSecret = 'gQHBuXo0Amw6fTlt1CwJp8xiIqnQxxgjyfTCQnBZz0nBUmqbBi'
accessToken = '1331549356277817344-w4vmuKtf6W6qCcwvaNyqiqdvCjCILh'
accessTokenSecret = 'kc3IqpTz3h0gzSny9MtdVuYVnQgoPXS2dZ0wZo48lYyRO'

auth = tweepy.OAuthHandler(consumerKey, consumerSecret)
auth.set_access_token(accessToken, accessTokenSecret)
api = tweepy.API(auth,wait_on_rate_limit=True)

data = {"documents": []}

# Inserimento Hashtag
inputTerm = input("Enter Keyword/Tag to search about: ")
searchTerm = inputTerm + " -filter:retweets"

print("Start Tweet Capturing..")
for tweet in tweepy.Cursor(api.search,q=searchTerm, lang="it", since="2020-11-27", until="2020-12-03", result_type="mixed", tweet_mode="extended").items(1000):
    rt_count = tweet.retweet_count
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
    hast = cleanHashtags(hast)
    tt={
        "Id": tweet.id,
        'Hashtag': inputTerm,
        "Retweet": rt_count,
        "Data":str(ddata),
        "Testo":tweet.full_text,
        "Hashtags": hast,
        "Sentiment": 0,
        "Compound": 0
    }
    #data['documents'].append({"language": "it", "id": tweet.id, "text": tweet.full_text, "Retweet": rt_count})
    collection.insert_one(tt)



