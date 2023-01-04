const Sauce = require('../models/Sauce');
const fs = require('fs');


exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });

    sauce.save()
        .then(() => { res.status(201).json({ message: 'Sauce saved' }) })
        .catch(error => { res.status(400).json({ error }) })
}

exports.modifySauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                return res.status(401).json({ message: 'Not authorized' });
            }
        });

    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modified' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Sauce deleted !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
}

exports.likeSauce = (req, res) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;

    switch (like) {
        case 1:
            Sauce.updateOne({ _id: sauceId }, {
                $push: { usersLiked: userId },
                $inc: { likes: +1 }
            })
                .then(() => res.status(200).json({ message: 'like added' }))
                .catch((error) => res.status(400).json({ error }))
            break;

        case 0:
            Sauce.findOne({ _id: sauceId })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: sauceId }, {
                            $pull: { usersLiked: userId },
                            $inc: { likes: -1 }
                        })
                            .then(() => res.status(200).json({ message: 'Like removed' }))
                            .catch((error) => res.status(400).json({ error }))
                    }
                    if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({ _id: sauceId }, {
                            $pull: { usersDisliked: userId },
                            $inc: { dislikes: -1 }
                        })
                            .then(() => res.status(200).json({ message: 'Dislike removed' }))
                            .catch((error) => res.status(400).json({ error }))
                    }
                })
                .catch((error) => res.status(404).json({ error }))
            break;

        case -1:
            Sauce.updateOne({ _id: sauceId }, {
                $push: { usersDisliked: userId },
                $inc: { dislikes: +1 }
            })
                .then(() => { res.status(200).json({ message: 'Dislike added' }) })
                .catch((error) => res.status(400).json({ error }))
            break;
        default:
            console.log(error);
    }
}