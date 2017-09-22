/****************************************************************************
 ****************************************************************************
    
    Configure Firebase
    
*****************************************************************************
*****************************************************************************/
const config = {
    "apiKey"           : "AIzaSyDjGV94on0gidAzG2sLCy5F8s-tkQXAzPc",
    "authDomain"       : "locall-atx512.firebaseapp.com",
    "databaseURL"      : "https://locall-atx512.firebaseio.com",
    "projectId"        : "locall-atx512",
    "storageBucket"    : "locall-atx512.appspot.com",
    "messagingSenderId": "1032168672035"
};

firebase.initializeApp(config);

const database_events = firebase.database().ref("events");



/****************************************************************************
 ****************************************************************************
    
    Initialize
    
*****************************************************************************
*****************************************************************************/
// Possible events
const eventNames = {
    "eat"  : ["asian"  , "bbq"    , "indian" , "pizza"  , "tex-mex"],
    "play" : ["bowl"   , "hike"   , "movie"  , "spa"    , "swim"   ],
    "drink": ["bar"    , "brewery", "coffee" , "tea"    , "wine"   ]
};



/****************************************************************************
 ****************************************************************************
    
    Remove duplicates
    
*****************************************************************************
*****************************************************************************/
for (let eventType in eventNames) {
    eventNames[eventType].forEach(eventName =>
        database_events.child(`${eventType}/${eventName}`).once("value").then(function(snapshot) {
            const database     = snapshot.val();
            let   database_new = {};

            let names = [], name;

            for (let key in database) {
                // Ignore the proto method
                if (!database.hasOwnProperty(key)) {
                    continue;
                }
                
                // Check for duplicate names
                name = database[key].name;

                if (!names.includes(name)) {
                    database_new[key] = database[key];
                    names.push(name);
                }
            }

            // Overwrite in Firebase
            database_events.child(`${eventType}/${eventName}`).set(database_new);

            console.log(`${eventType}, ${eventName}:`);
            console.log(`\t${Object.keys(database).length} -> ${Object.keys(database_new).length}`);
        })
    );
}