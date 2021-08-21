# Speed-Typing-Application

A simple Speed-Typing-Application made in vanilla JS.

## Description

Type the displayed text and follow the cursor. Once the first key is pressed a stopwatch starts measuring the speed. Correct and incorrect characters are marked in grey and red color respectively. When typing a wrong character the cursor remains on the current character until the correct key is pressed. At the end of each typing passage a summary of mistakes, speed, and words per minute is displayed. Press any key to continue to the next text passage.

# Under the hood:

The passages are fetched from a citations API.
When a given text is loaded a render method creates a <span> with a unique id for each text character dynamically. During typing every pressed key (or key combination) is compared with the character at the respective position. The corresponding <span> is assigned one of 5 classes to control its CSS attributes.

.cursor

.correct

.correct_space

.incorrect

.incorrect_space

https://malullaby.github.io/Speed-Typing-Application/index.html
