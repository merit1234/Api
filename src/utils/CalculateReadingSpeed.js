const countWords = require("./CountWords");
const formatReadingTime = require("./FormatReadingTime");


// Function to calculate reading time based on word count and reading speed
function calculateReadingTime(text, readingSpeed = 200){
    const wordCount = countWords(text);
    // Average reading speed in words per minute
    const readingSpeedInMinutes = Math.ceil(wordCount / readingSpeed);
    // Format reading time to show textual representation
    return formatReadingTime(readingSpeedInMinutes);
}

module.exports = calculateReadingTime;
