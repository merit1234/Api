// Function to count words
function countWords(text) {
    formattedText = text.split(/\s+/);
    return formattedText.length;
}
module.exports=countWords;