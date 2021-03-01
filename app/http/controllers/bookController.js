const Book = require('../../models/Book')
const path = require('path')

function bookController(){

    return{
        addBook(req,res){
            res.render('addBook')
        },
        async postBook(req,res,next){

            const title = req.body.title
            const review = req.body.review
            const author = req.body.author
            const bookCoverLink = req.body.bookCoverLink

            if(!title || !review || !author || !bookCoverLink){

                req.flash('error','All fields are Required')
                req.flash('title',title)
                req.flash('review',review)
                req.flash('author',author)
                req.flash('bookCoverLink',bookCoverLink)

                return res.redirect('/addBook')
            }
                const newBook = await new Book({
                    title,
                    review,
                    author,
                    bookCoverLink
                })

                newBook.save().then((newBook) => {
                    const id = newBook._id;
                    return res.redirect(`book/${ id }`)
                }).catch(err => {
                    req.flash('error','Something Went Wrong')
                    return res.redirect('/addBook')
                })
        },
        async singleBook(req,res,next){

            const theBook = await Book.findById(req.params.id)
            return res.render('book',{ book : theBook })
        },
        async editBook(req,res,next){

            const book = await Book.findById(req.params.id)
            return res.render('editBook',{ book: book })
        },
        async editBookUpdate(req,res,next){

            const id = req.params.id;

            const title = req.body.title
            const review = req.body.review
            const author = req.body.author
            const bookCoverLink = req.body.bookCoverLink

            if(!title || !review || !author || !bookCoverLink){

                req.flash('error','All fields are Required')
                req.flash('title',title)
                req.flash('review',review)
                req.flash('author',author)
                req.flash('bookCoverLink',bookCoverLink)

                return res.redirect(`/editBook/${ id }`)
            }

            const book = await Book.findByIdAndUpdate(id,
                {
                    title: title,
                    author: author,
                    review: review,
                    bookCoverLink: bookCoverLink
                }, function(err,model){
                    if(err){
                        console.log(err);
                        return res.send(err);
                    }

                    return res.redirect(`/book/${ id }`)
                });
        },
        async editBookDelete(req,res,next){

            const id = req.params.id;

            const book = await Book.findByIdAndDelete(
                id,
                function(err){
                    if(err){
                        res.send(err)
                    }

                    return res.redirect('/');
                })
        }
    }
} 

module.exports = bookController;