var path = require('path');
var fs = require('fs');
const searchFile = './';

const isValidJson = (string) => {
    try {
      JSON.parse(string)
      return true
    } catch (error) {
      console.log(error.message)
      return false
    }
  }

  const getAllFiles = (dirPath, arrayOfFiles) => {
      files = fs.readdirSync(dirPath)
      arrayOfFiles = arrayOfFiles || []
    files.forEach(function (file) {
        if (file.search('node_module') == -1 && file.search('.git') == -1 && file.search('node_module') == -1) {
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
    for(let i = 0; i < networkObj.data.length; i++) {
        networkArr.push(networkObj.data[i].networks)
    }
    return networkArr
}

const isValidMobile = () => {
    let networkArr = getNetworks()
    let mobileContent = fs.readFileSync('./wallet/tokens/mobile', 'utf8')
    let mobileObj = JSON.parse(mobileContent)
    for(let i = 0; i < mobileObj.length; i++){
        if(networkArr.indexOf(mobileObj[i].network) != -1){
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
    for(let i = 0; i < mobileObj.length; i++){
        if(networkArr.indexOf(mobileObj[i].network) != -1){
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
    for(let i = 0; i < mobileObj.length; i++){
        if(networkArr.indexOf(mobileObj[i].network) != -1){
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
    for(let i = 0; i < mobileObj.length; i++){
        if(networkArr.indexOf(mobileObj[i].network) != -1){
            expect(true).toEqual(true)
        } else {
            expect(false).toEqual(true)
        }
    }
}

it('validate JSON file', async () => {
    let files = await getAllFiles(searchFile)
    const contents = await Promise.all(files.map((file) => {
        if((file.search('./wallet/') != -1)){
            return fs.readFileSync('./' + file, 'utf8')
        } else if((file.search('.json') != -1)){
            return fs.readFileSync('./' + file, 'utf8')
        }
        return null
    }))
    contents.forEach((content) => {
        expect(isValidJson(content)).toEqual(true)
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
