import { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/howItWorks.module.scss"

const nerdContent: { [key: string]: string[] } = {
    "Encryption": [
        "Clowncryption utilizes NodeJS Crypto Module to first convert the UTF-8 string into a secure Hex string. This process has two very important advantages, first, it creates an AES encrypted string (The Encryption Algorithm Options are AES-128, AES-192, and AES-256), and second, it creates a string that only has the characters A-F and 0-9. The first advantage is fairly self-explanatory but the second one is not as self-explanatory. The main advantage of having fewer characters is that you have fewer characters to substitute, this makes the code and the charsets that the encoding process significantly easier than if you needed a lot of characters or if I was encoding straight UTF-8 like in the last version of ClownCryption.",
        "There are some disadvantages to using the Crypto Module, for starters, NodeJS doesn't run on browsers so it's a little tricky to implement on browsers, this can be done by simply poly-filling the Crypto module or by running it on the server side as this website does. Another disadvantage of using the Crypto module is that it uses OpenSSL, this may initially seem like an advantage as it is software made by people who know what they are doing, however, OpenSSL is extremely picky about the arguments it gets which makes it hard in implement as a user interface because it needs such specific arguments. In my opinion, those disadvantages do not outweigh the benefits of the crypto module and I considered it the best option for this package/website."
    ],
    "Encoding": [
        "The encoding process of ClownCryption is different based on the setting of the client and the charset's characters and type. ClownCryption uses a form of substitution cipher. It's a simple substitute cipher comparable to a Nomenclator. While this may not be the most secure option, it is certainly the simplest. As of right now it only has support for one emoji/character per encoded character which isn't very secure but was the best option when considering that all strings passed into the encoding functions were already encrypted in AES so the encoding's security wasn't the main focus when developing it.",
        "While the encoding process makes the string more secure and thus more secure than AES, it has several problems that make it impractical or impossible to use. The main issue is the storage of the encoded string, this problem is hard to solve as emojis take up 16-32 bytes each, all emojis in the charsets that are built into ClownCryption are only two characters, that means that if you only use charsets that are built in, you still double the length of the encoded string. This problem is worsened by our 'Binary Charsets' which not only encodes string in emojis but binary too, this feature only exists because we wanted to keep this version closish to the original version, and frankly it's just funny to look at."
    ],
    "Why?": [
        "The ClownCryption Project was started in May 2022 with the first version being an extremely insecure and inefficient shift cipher that only took 4 hours to complete and was running on a static website with only 166 lines of Javascript, it has since advanced to a NodeJS package that is more secure than AES.",
        "ClownCryption was initially written for two reasons, I wanted more experience with running JS on the web and I wanted to dip my toes into the world of encryption. That one project turned out to be a can of worms because every time I found a bug I decided to just make another improvement and it eventually lead to a 900-line NPM package that I've spent a lot of time on (Usually when I wasn't supposed to be)."
    ]
}

const normalPersonContent: { [key: string]: string[] } = {
    "Encryption": [
        "Encryption is a method of protecting information from being accessed by unauthorized people. It involves the use of complex mathematical algorithms to encode the information, making it difficult for anyone who does not have the special key or password to decipher. This way, even if someone were to obtain the encrypted information, they would not be able to understand or use it without the key. Encryption is commonly used to protect sensitive information, such as credit card numbers and personal data, when it is transmitted over the internet or stored on a computer.",
        "Clowncryption uses a type of encryption called Advanced Encryption System to turn regular text into a secret code. This has two benefits. First, it makes the information hard to read without the correct key. Second, it changes the text into a code that only uses certain letters and numbers, which makes it easier to encrypt because there are fewer possible characters to encrypt in emojis."
    ],
    "Encoding": [
        "Encoding is the process of converting information from one form to another. In the context of computers, this usually refers to converting data from one format to another to make it more easily stored or transmitted. For example, when you type a letter on your computer, it is translated into a series of zeros and ones (a binary code) that the computer can understand and store.",
        "The way ClownCryption encodes information varies depending on the settings of the client and the type of characters being used. ClownCryption uses a type of substitution cipher, which is a simple way of replacing one thing with another. This method is not very secure, but it is easy to use. Currently, ClownCryption only has support for using one emoji or character per encoded character, which is not very secure. However, when it was developed, the main focus was not on making the encoding secure because the strings being passed into the encoding functions were already encrypted using a different method called Advanced Encryption System (AES).",
        "While the encoding process makes the information more secure, it has several problems that make it difficult or impossible to use. The biggest issue is how to store the encoded information. Because emojis take up a lot of space (the equivalent of 2-4 characters for each emoji), the encoded information can be over twice as long as the original. This problem is made worse by the use of 'Binary Charsets', which encode the information in both emojis and binary code. This feature was added because the creators wanted to keep this version similar to the original, and because it looks really funny."
    ],
    "Why?": [
        "The ClownCryption Project began in May 2022. The first version of the project was an encryption method that was not very secure or efficient. It only took 4 hours to create and was only available on a simple website with 166 lines of code (That's not a lot). Since then, the project has been improved and is now a package that can be used with NodeJS, a programming runtime. It is more secure than a method called Advanced Encryption System (AES) which is used by the United States Government for securing information.",
        "The person who created ClownCryption wanted to learn more about running JavaScript on the web and try their hand at encryption. However, they quickly discovered that the project was more complex than they anticipated. Every time they found a problem, they decided to improve the project instead of fixing the issue. As a result, ClownCryption has become a large package with over 900 lines of code. The person has spent a lot of time working on the project, even when they were supposed to be doing something else."
    ]
}

export default function HowItWorks() {
    const modes = ["Nerd", "Ultra Nerd", "Normal Human"]
    const [mode, setMode] = useState(modes[0])
    const [content, setContent] = useState(nerdContent)

    function onButtonClick() {
        const newMode = modes[((modes.indexOf(mode)) + 1) % modes.length]
        if (newMode === "Normal Human") setContent(normalPersonContent)
        else setContent(nerdContent)
        setMode(newMode)
    }

    function render(str: string) {
        if (mode === "Ultra Nerd") return str.split("").map((val) => val.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
        return str
    }

    function renderMainContent() {
        return Object.entries(content).map(([title, items], index) => <li key={index + "liMap"}><div><h2>{render(title)}</h2><ul>{items.map((val, index) => <li key={index + "content"}>{render(val)}</li>)}</ul></div></li>)
    }

    return (
        <Layout name="How it Works">
            <article className={styles.content}>
                <div className={styles.head}>
                    <h1>{render("How it Works")}</h1> 
                    <button onClick={onButtonClick}>{render("Toggle Nerd Mode")}</button>
                    <h3>{render(`Current Mode: ${mode}`)}</h3>
                    <ul>{renderMainContent()}</ul>
                </div>
            </article>
        </Layout>
    )
}