
exports.getUserData = (req, res, next) => {
    res.status(200).json({
        name: 'Juan',
        email: 'xxx@xxx.com',
        adress: 'Jaime Zudañez 1110'
    })
}

