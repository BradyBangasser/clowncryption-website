import formStyles from "../styles/form.module.scss"
import Layout from "../components/layout"
import * as React from "react"
import { useRouter } from "next/router"
import Dropdown from "../components/dropdown"

export default function TryItOut() {
    const params = useRouter().query

    React.useEffect(() => {
        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
        tx[i].addEventListener("input", OnInput, false);
        }

        function OnInput(this: any) {
            this.style.height = 0;
            this.style.height = (this.scrollHeight) + "px";
        }
    })

    async function handleForm(event: React.SyntheticEvent) {
        event.preventDefault()
        const formVals = Object.fromEntries(Object.entries(event.target).map(([key, val]) => {
            if (typeof val.name === "undefined" || val.name.length <= 0) return
            return [val.name, val.value]
        }).filter((val) => typeof val !== "undefined") as any)

        const res = await fetch("https://clowncryption.itsnotcatchy.com/api/crypt", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formVals)
        })

        if (res.status !== 200) return alert((await res.json() as any).code)

        const message = await res.text()

        const formDiv = document.getElementsByClassName(formStyles.formContainer)[0]
        const outDiv = document.getElementsByClassName(formStyles.outputDiv)[0];

        (document.getElementById("copyButton") as any).textContent = "Copy"
        formDiv.setAttribute("style", "display:none");
        outDiv.setAttribute("style", "display:block")
        outDiv.children[outDiv.children.length - 1].append(message)
    }

    function copyText() {
        (document.getElementById("copyButton") as HTMLElement).textContent = "Copied"
        navigator.clipboard.writeText(document.getElementById("output")?.innerText || "")
        setTimeout(() => (document.getElementById("copyButton") as any).textContent = "Copy", 5000)
    }

    function resetForm() {
        document.getElementsByClassName(formStyles.formContainer)[0].removeAttribute("style")
        const outDiv = document.getElementsByClassName(formStyles.outputDiv)[0]
        outDiv.setAttribute("style", "display:none")
        outDiv.children[outDiv.children.length - 1].textContent = ""
    }

    return (
        <Layout name="Try It Out">
            <div className={formStyles.formContainer}>
                <form id={"encryptForm"} onSubmit={handleForm}>
                    <ul style={{
                        padding: 0,
                        margin: 0,
                        textDecoration: "none",
                        listStyleType: "none"
                    }}>
                        <li>
                            <div className={formStyles.formInputContainer}>
                                <label htmlFor="key" style={{
                                    marginRight: "5px"
                                }}>Key:</label>
                                <div>
                                    <input id="key" name="key" required defaultValue={params.key ?? ""} />
                                    <div className={formStyles.underline} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${formStyles.formInputContainer} ${formStyles.dropdown} `}>
                                <Dropdown name="Advanced Options" display="flex">
                                    <div className={formStyles.formInputDropContainer} style={{ display: "flex" }}>
                                        <label htmlFor="iv" style={{
                                            marginRight: "5px"
                                        }}>IV:</label>
                                        <div style={{
                                            display: "block"
                                        }}>
                                            <input id="iv" name="iv" defaultValue={params.iv ?? "Initalizing Vector"} />
                                            <div className={formStyles.underline} />
                                        </div>
                                    </div>
                                    <div className={formStyles.formInputDropContainer} style={{ display: "flex" }}>
                                        <label htmlFor="salt" style={{
                                            marginRight: "5px"
                                        }}>Salt:</label>
                                        <div style={{
                                            display: "block"
                                        }}>
                                            <input id="salt" name="salt" defaultValue={params.salt ?? "Pepper"} />
                                            <div className={formStyles.underline} />
                                        </div>
                                    </div>
                                    <div className={formStyles.formInputDropContainer} style={{ display: "flex" }}>
                                        <label htmlFor="algore" style={{
                                            marginRight: "5px"
                                        }}>Algorithm:</label>
                                        <div style={{
                                            display: "block"
                                        }}>
                                            <select id="algore" name="algore" className={formStyles.select} defaultValue={params.algore ?? "192"}>
                                                <option value="128">AES-128</option>
                                                <option value="192">AES-192</option>
                                                <option value="256">AES-256</option>
                                            </select>
                                            <div className={formStyles.underline} />
                                        </div>
                                    </div>
                                    <div className={formStyles.formInputDropContainer} style={{ display: "flex" }}>
                                        <label htmlFor="charsetType" style={{
                                            marginRight: "5px"
                                        }}>{"Charset\u00a0Type:"}</label>
                                        <div style={{
                                            display: "block"
                                        }}>
                                            <select id="charsetType" name="charsetType" className={formStyles.select} defaultValue={params.charsetType ?? "binary"}>
                                                <option value={"binary"}>Binary</option>
                                                {/* <option value={"ebinary"}>Efficient Binary</option> */}
                                                <option value={"literal"}>Literal</option>
                                            </select>
                                            <div className={formStyles.underline} />
                                        </div>
                                    </div>
                                    <div className={formStyles.formInputDropContainer} style={{ display: "flex" }}>
                                        <label htmlFor="encoding" style={{
                                            marginRight: "5px"
                                        }}>{"Encoding:"}</label>
                                        <div style={{
                                            display: "block"
                                        }}>
                                            <select id="encoding" name="encoding" className={formStyles.select} defaultValue={params.encoding ?? "emoji"}>
                                                <option value={"emoji"}>UTF/Emoji</option>
                                                <option value={"hex"}>UTF/Hex</option>
                                            </select>
                                            <div className={formStyles.underline} />
                                        </div>
                                    </div>
                                </Dropdown>
                            </div>
                        </li>
                        <li>
                            <div className={formStyles.formInputContainer}>
                                <div>
                                    <textarea name="message" id="message" className={formStyles.messageTextArea} placeholder="Message" required />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={formStyles.formInputContainer} style={{ display: "flex" }}>
                                <label htmlFor="mode" style={{
                                    marginRight: "5px"
                                }}>{"Mode:"}</label>
                                <div style={{
                                    display: "block"
                                }}>
                                    <select id="mode" name="mode" className={formStyles.select} defaultValue={"en"}>
                                        <option value={"en"}>Encryption</option>
                                        <option value={"de"}>Decryption</option>
                                    </select>
                                    <div className={formStyles.underline} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`center ${formStyles.formInputContainer}`}>
                                <input type="submit" />
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            <div className={formStyles.outputDiv}>
                <h2>Your Message:</h2>
                <div>
                    <button id="copyButton" onClick={copyText}>Copy</button>
                    <button onClick={resetForm}>Do it again</button>
                </div>
                <p id="output" />
            </div>
        </Layout>
    )
}
