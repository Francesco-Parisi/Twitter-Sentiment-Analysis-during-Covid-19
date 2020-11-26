from pymongo import MongoClient
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from textblob import TextBlob

### Database Connection
client= MongoClient("mongodb+srv://dbUser:dbUser@cluster0.lcwhz.mongodb.net/ProgReti?retryWrites=true&w=majority")
db=client['ProgReti']
collection=db['Week-1']

### Tweet Translator
def translatorTweet(tweet):
    blob = TextBlob(str(tweet))
    translate = blob.translate(from_lang='it',to='en')
    return translate

def Sentiment(compound):
    if(compound <= -0.5501 and compound >= -1):
        sentimentAnalysis = 1
    if(compound <= -0.2001 and compound >= -0.5500):
        sentimentAnalysis = 2
    if(compound >= -0.2000 and compound <= 0.2000):
        sentimentAnalysis = 3
    if(compound >= 0.2001 and compound <= 0.5500):
        sentimentAnalysis = 4
    if(compound >= 0.5501 and compound <= 1):
        sentimentAnalysis = 5
    return sentimentAnalysis

analyzer = SentimentIntensityAnalyzer()
hashtag = input("Inserisci un Hashtag per fare Update: ")
count = 0

for x in collection.find({ "Hashtag":hashtag,"Sentiment":0}):
    tweet = ("Testo:", x["Testo"])
    translate = translatorTweet(tweet)
    sentiment = analyzer.polarity_scores(str(translate))
    compound = sentiment["compound"]
    sentimentAnalysis = Sentiment(compound)
    query = {"Id":x["Id"],"Sentiment":sentimentAnalysis,"Compound": compound}
    print(query)
    collection.update_one({"_id":x["_id"]},{"$set":{"Sentiment":sentimentAnalysis,"Compound":compound}})
    count += 1

print("Total Tweets with {} Updated Success: {}".format(hashtag,count))
