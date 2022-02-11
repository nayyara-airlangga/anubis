const slugify = (text: string) => {
  // Trim the string (removing leading and trailing whitespace)
  text = text.replace(/^\s+|\s+$/g, "")

  text = text.toLowerCase()

  const charsWithAccents =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;"
  const charsWithoutAccents =
    "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------"

  for (let i = 0; i < charsWithAccents.length; i++) {
    text = text.replace(
      new RegExp(charsWithAccents.charAt(i), "g"),
      charsWithoutAccents.charAt(i)
    )
  }

  text = text
    // Removes invalid characters
    .replace(/[^a-z0-9 -]/g, "")
    // Replace whitespace with a dash
    .replace(/\s+/g, "-")
    // Replace multiple dashes with single dash
    .replace(/-+/g, "-")

  return text
}

export { slugify }
