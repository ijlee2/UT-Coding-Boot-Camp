const clozeSymbol = "...";

module.exports = function Card(myType, question, answer) {
    // Scope-safe constructor
    if (!(this instanceof Card)) {
        return new Card(myType, question, answer);
    }

    // Check whether the card is cloze-deleted
    const regex = new RegExp(answer, "i");
    
    if (myType === "Cloze" && !question.match(regex)) {
        throw "Cloze deletion failed.";
    }

    // Record the question and answer
    const type  = myType;
    const front = (myType === "Cloze") ? question.replace(regex, clozeSymbol) : question;
    const back  = answer;

    // Return an object 
    this.jsonify = function() {
        return {type, front, back};
    }
}