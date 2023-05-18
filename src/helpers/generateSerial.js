function generateSerial()
{
    return Array.from(Array(32), () => Math.floor(Math.random() * 36).toString(36)).join("")
}

export default generateSerial