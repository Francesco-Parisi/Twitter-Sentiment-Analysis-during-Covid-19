import tweepy
import pymongo
import datetime,requests,os,re
from pymongo import MongoClient
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from deep_translator import MyMemoryTranslator

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

### Tweet Translator
def translatorTweet(tweet):
    translated = MyMemoryTranslator(source="it", target="en").translate(tweet)
    return translated


### Database Connection
client= MongoClient("mongodb+srv://dbUser:dbUser@cluster0.lcwhz.mongodb.net/ProgReti?retryWrites=true&w=majority")
db=client['ProgReti']
collection=db['Week-one']

#### Twitter Developer Credentials
consumerKey = 'bBL43Fu0ZcXCxxnzOhCmqxPu9'
consumerSecret = 'begHo3PEX199EuegKzqzmzcYjcV2hcvJxI0cYBdSLeEzPyR48Y'
accessToken = '718840068-lGh9WG0qvvZ7Au3ar0lrFAczzN0SVkzmzFqoKNgJ'
accessTokenSecret = 'FyCzGpaCkC0MpHycHxhpYyBs7hgIrUQMh3EMG7UNHV2KF'
auth = tweepy.OAuthHandler(consumerKey, consumerSecret)
auth.set_access_token(accessToken, accessTokenSecret)
api = tweepy.API(auth,wait_on_rate_limit=True)

data = {"documents": []}
tweetSentiment = {"documents": []}

# Inserimento Hashtag
inputTerm = input("Enter Keyword/Tag to search about: ")
searchTerm = inputTerm + " -filter:retweets"
analyzer = SentimentIntensityAnalyzer()
rt_count = 0

print("Start Tweet Capturing..")
for tweet in tweepy.Cursor(api.search,q=searchTerm, lang="it", since="2020-11-11", until="2020-11-19", result_type="mixed", tweet_mode="extended").items():
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
    #trans = translatorTweet(tweet.full_text)
    #sentiment = analyzer.polarity_scores(trans)
    tt={
        "Id": tweet.id,
        'Hashtag': inputTerm,
        "Retweet": rt_count,
        "Data":str(ddata),
        "Testo":tweet.full_text,
        "Hashtags": hast,
        "Sentiment": 0
    }
    data['documents'].append({"language": "it", "id": tweet.id, "text": tweet.full_text, "Retweet": rt_count})
    #tweetSentiment['documents'].append(({"language": "it", "id": tweet.id, "text": trans, "score": sentiment}))
    collection.insert_one(tt)
