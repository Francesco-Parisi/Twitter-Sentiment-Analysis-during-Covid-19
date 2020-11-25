from pymongo import MongoClient

client= MongoClient("mongodb+srv://dbUser:dbUser@cluster0.lcwhz.mongodb.net/ProgReti?retryWrites=true&w=majority")
db=client['ProgReti']
collection=db['Tweet']
count = str(collection.count())
Hashtags=['#andratuttobene','#andràtuttobene','#natale2020','#immuni','#iorestoacasa','#dpcm',
          '#zonarossa','#zonaarancione','#zonagialla','#giuseppeconte','#nolockdown', '#LItaliaSiRibella',
          '#lockdownitalia', '#coronavirus','#congiuntifuoriregione', '#vaccinocovid','#sanità','#sanita',
          '#secondaondata','#covidioti','#dad','#mascherine']

for x in range(len(Hashtags)):
    result=collection.find({ "Hashtags":{'$regex':Hashtags[x],'$options':'i'}})
    print(Hashtags[x]+' : '+str(result.count()))

