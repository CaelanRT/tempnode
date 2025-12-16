

const readData = (req,res) => {
    const {temperature, humidity} = req.body;
    console.log(temperature + " " + humidity);

    res.status(200).json({temperature:temperature, humidity:humidity});
}

module.exports = readData;