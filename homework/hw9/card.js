const clozeSymbol = "...";

module.exports = function Card(type, question, answer) {
    // Scope-safe constructor
    if (!(this instanceof Card)) {
        return new Card(type, question, answer);
    }

    // Check whether the card is cloze-deleted
    const isCloze = (type === "Cloze");
    const regex   = new RegExp(answer, "i");
    
    if (isCloze && !question.match(regex)) {
        throw "Cloze deletion failed.";
    }

    // Record the question and answer
    const front = (isCloze) ? question.replace(regex, clozeSymbol) : question;
    const back  = answer;

    // Return an object 
    this.jsonify = function() {
        return {isCloze, front, back};
    }
}