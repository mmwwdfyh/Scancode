export const getScode = () => {
  return new Promise((resolve, reject) => {
    wx.scanCode({
      onlyFromCamera: true,
      success: (result) => {
        resolve(result);
        console.log(result)
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}