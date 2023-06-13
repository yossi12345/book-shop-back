const ADMIN_PASSWORD_REGEX=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/
const GENRES=[
    "פרוזה מקור","מתח ופעולה","רומן רומנטי",
    "רומן אירוטי","מדריכים ועצות","היסטוריה ופוליטיקה","עיון"
]
module.exports={
    ADMIN_PASSWORD_REGEX,
    GENRES
}