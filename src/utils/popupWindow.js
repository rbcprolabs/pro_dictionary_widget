export default function popupWindow(url, title, width, height) {
  const
    left = (screen.width/2)-(width/2),
    top = (screen.height/2)-(height/2)
  return window.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`)
}
