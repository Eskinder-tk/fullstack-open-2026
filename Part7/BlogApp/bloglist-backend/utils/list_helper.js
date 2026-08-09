const blog = require("../models/blog")


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce((sum , item) => { return  sum + item.likes }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0){
        return "none"
    } 

    else if (blogs.length === 1) {
        return blogs[0]
    }
    
    else {
        let favorite = 0
        for (i = 0; i < blogs.length; i++)  {
            if (blogs[i].likes > favorite){
                    favorite = blogs[i].likes
            }
        }
        return blogs.find((y) => y.likes === favorite)
    }
}     

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return 0
    }
    else {
        const edgar = blogs.filter( i => i.author === "Edsger W. Dijkstra")
        const edgarN = edgar.length
        const mike = blogs.filter( i => i.author === "Michael Chan")
        const mikeN = mike.length
        const robert = blogs.filter( i => i.author === "Robert C. Martin")
        const robertN = robert.length
        const total = {"Robert C. Martin" : robertN, "Michael Chan" : mikeN , "Edsger W. Dijkstra" : edgarN }
        const results = Object.entries(total).reduce((max , current) => {
            if (max.Blogs < current[1]) {
                return  { Author : current[0], Blogs : current[1] }
            }
            else if(max.Blogs === current[1]){
                return { Author : current[0], Blogs : current[1] } || max
            }
            else {
                return max
            }
    }, {
        Author : "",
        Blogs : 0
    })
        return results
    }
}


const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return 0
    }
    else if (blogs.length === 1) {
        return { author : blogs[0].author , likes : blogs[0].likes}
    }

    else {
        const favorite = blogs.reduce((max , item) => {
        if (max.likes > item.likes) {
           return { author : max.author , likes : max.likes }
        }
        else if (max.likes < item.likes) {
            return { author : item.author , likes : item.likes }
        }
        else {
            return { author : max.author , likes : max.likes } || { author : item.author , likes : item.likes }
        }

    })
    return favorite
    }

    
}



module.exports = {
  dummy ,
  totalLikes ,
  favoriteBlog ,
  mostBlogs ,
  mostLikes
}
