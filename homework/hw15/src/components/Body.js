import React from "react";
//import "./Body.css";

const Body = () => {
    const threads = [
        {
            "threadId": 0,
            "title"   : "Eat Your Hamburgers, Apollo examples",
            "author"  : "Izuna"
        },

        {
            "threadId": 1,
            "title"   : "I Need a New PC! 2017 The Ryzing of Kaby Lake and NVMwhee!",
            "author"  : "Hazaro"
        }
    ];

    return (
        <div className="row">
            <div className="col s12 l10 offset-l1 xl8 offset-xl2">
                <div className="neotech-separator-3"></div>

                <h1>Latest Tech News</h1>

                <ul>
                    {
                        threads.map(t => 
                            <li className="neotech-threads" key={t.threadId}>
                                <a href={`/showthread_${t.threadId}`}>{t.title}</a> by {t.author}
                            </li>
                        )
                    }
                </ul>
                
                <div className="neotech-separator-3"></div>
            </div>
        </div>
    );
};

export default Body;