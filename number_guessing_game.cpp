#include <iostream>
#include <ctime>
#include <cstdlib>

int main() {
    srand(time(0)); // ensure truly randomized numbers by initializing the random seed with the current time
    int number = rand() % 100 + 1; // generate a random number between 1 and 100
    int guess, attempts = 0;

    std::cout << "Welcome to the guessing game! Guess a number between 1 and 100.\n";

    do {
        std::cout << "Enter your guess: ";
        std::cin >> guess;
        attempts++;

        if (guess > number) {
            std::cout << "Too high! Try again.\n";
        } else if (guess < number) {
            std::cout << "Too low! Try again.\n";
        }
    } while (guess != number);

    std::cout << "Congratulations! You found the number in " << attempts << " attempts.\n";

    return 0;
}
