from pymongo import MongoClient
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from textblob import TextBlob

### Database Connection
client= MongoClient("mongodb+srv://dbUser:dbUser@cluster0.lcwhz.mongodb.net/ProgReti?retryWrites=true&w=majority")
db=client['ProgReti']
collection=db['Tweet']

### Tweet Translator
def translatorTweet(tweet):
    blob = TextBlob(str(tweet))
    trans = blob.translate(from_lang='it',to='en')
    return trans

analyzer = SentimentIntensityAnalyzer()
hashtag = input("Inserisci un Hashtag per faare Update: ")
count = 0
for x in collection.find({},{ "_id": 0}):
    tweet = ("Testo:", x["Testo"])
    if(x["Hashtag"] == hashtag):
        translate = translatorTweet(tweet)
        sentiment = analyzer.polarity_scores(str(translate))
        query = {"Id":x["Id"],"Sentiment": sentiment["compound"]}
        print(query)
        collection.update_one({"Id":x["Id"]},{"$set":{"Sentiment":sentiment["compound"]}})
        count += 1


print("Total Tweets Updated: {}".format(count))