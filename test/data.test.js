const path = require('path')
const fs = require('fs')
const jsonlint = require("jsonlint")
const searchFile = './'
const specialNetwork = ['binancesmart', 'ethereumclassic', 'TC-TEST', 'bitcoins', 'BTC-TEST']

const isValidJson = (string) => {
    try {
        jsonlint.parse(string)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const getAllFiles = (dirPath, arrayOfFiles) => {
    files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || []
    files.forEach(function (file) {
        if (file.search('node_module') == -1 && file.search('.git') == -1 && file.search('yarn') == -1) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
            } else {
                arrayOfFiles.push(path.join(dirPath, "/", file))
            }
        }
    })
    return arrayOfFiles
}

const getNetworks = () => {
    let networkArr = []
    let networkContent = fs.readFileSync('./wallet/tokens/get_public_network', 'utf8')
    let networkObj = JSON.parse(networkContent)
    for (let i = 0; i < networkObj.data.length; i++) {
        networkArr.push(networkObj.data[i].networks)
    }
    let result = networkArr.concat(specialNetwork)
    return result
}

const isValidMobile = () => {
    let networkArr = getNetworks()
    let mobileContent = fs.readFileSync('./wallet/tokens/mobile', 'utf8')
    let mobileObj = JSON.parse(mobileContent)
    for (let i = 0; i < mobileObj.length; i++) {
        if (networkArr.indexOf(mobileObj[i].network) != -1) {
            expect(true).toEqual(true)
        } else {
            expect(false).toEqual(true)
        }
    }
}

const isValidMobilev2 = () => {
    let networkArr = getNetworks()
    let mobileContent = fs.readFileSync('./wallet/tokens/mobilev2', 'utf8')
    let mobileObj = JSON.parse(mobileContent)
    for (let i = 0; i < mobileObj.length; i++) {
        if (networkArr.indexOf(mobileObj[i].network) != -1) {
            expect(true).toEqual(true)
        } else {
            expect(false).toEqual(true)
        }
    }
}

const isValidToken = () => {
    let networkArr = getNetworks()
    let mobileContent = fs.readFileSync('./wallet/lists/token', 'utf8')
    let mobileObj = JSON.parse(mobileContent)
    for (let i = 0; i < mobileObj.length; i++) {
        if (networkArr.indexOf(mobileObj[i].network) != -1) {
            expect(true).toEqual(true)
        } else {
            expect(false).toEqual(true)
        }
    }
}

const isValidListToken = () => {
    let networkArr = getNetworks()
    let mobileContent = fs.readFileSync('./wallet/list-token', 'utf8')
    let mobileObj = JSON.parse(mobileContent)
    for (let i = 0; i < mobileObj.length; i++) {
        if (networkArr.indexOf(mobileObj[i].network) != -1) {
            expect(true).toEqual(true)
        } else {
            expect(false).toEqual(true)
        }
    }
}

it('validate JSON file', async () => {
    let files = await getAllFiles(searchFile)
    const contents = await Promise.all(files.map((file) => {
        if ((file.search('wallet/') != -1)) {
            let result = [fs.readFileSync('./' + file, 'utf8'), file]
            return result
        } else if ((file.search('.json') != -1)) {
            let result = [fs.readFileSync('./' + file, 'utf8'), file]
            return result
        }
        return null
    }))

    contents.forEach((content) => {
        if (content != null) {
            if (isValidJson(content[0]) == true) {
                expect(true).toEqual(true)
            } else {
                console.log('!!!! False at ', content[1])
                expect(false).toEqual(true)
            }
        }
    })
})

test("test validation mobile", () => {
    isValidMobile()
})

test("test validation mobilevs", () => {
    isValidMobilev2()
})

test("test validation list-token", () => {
    isValidToken()
})

test("test validation token", () => {
    isValidListToken()
})
