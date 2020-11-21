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
    translate = blob.translate(from_lang='it',to='en')
    return translate

#def Sentiment(compound):


analyzer = SentimentIntensityAnalyzer()
hashtag = input("Inserisci un Hashtag per fare Update: ")
count = 0

for x in collection.find({},{ "_id": 0}):
    tweet = ("Testo:", x["Testo"])
    if(x["Hashtag"] == hashtag):
        translate = translatorTweet(tweet)
        sentiment = analyzer.polarity_scores(str(translate))
        compound = sentiment["compound"]
        if(compound >= -0.6001 and compound <= -1):
            sentimentAnalysis = "Negativo"
        if(compound >= -0.3001 and compound <= -0.6000):
            sentimentAnalysis = "Tendente Negativo"
        if(compound >= -0.3000 and compound <= 0.3000):
            sentimentAnalysis = "Neutro"
        if(compound >= 0.3001 and compound <= 0.6000):
            sentimentAnalysis = "Tendente Positivo"
        if(compound >= 0.6001 and compound <= 1):
            sentimentAnalysis = "Positivo"
        query = {"Id":x["Id"],"Sentiment":sentimentAnalysis,"Compound": compound}
        print(query)
        collection.update_one({"Id":x["Id"]},{"$set":{"Sentiment":sentimentAnalysis,"Compound":compound}})
        count += 1

print("Total Tweets with {} Updated Success: {}".format(hashtag,count))