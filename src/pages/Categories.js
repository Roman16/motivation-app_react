import React, {Component, Fragment} from 'react';

import {GetAllCategories} from '../actions/categories';
import {GetAllPhrasesByCategore} from '../actions/phrases';
import {ChangeCategoryAvatar} from '../actions/categories';
import {ChangeCategoryName} from '../actions/categories';
import {CreatePrase} from '../actions/phrases';
import {RemovePrase} from '../actions/phrases';
import {UpdatePrase} from '../actions/phrases';
import {ChangePhraseAvatar} from '../actions/phrases';
import CategoriesList from '../components/CategoriesList';
import Category from "../components/Category";
import Phrase from "../components/Phrase";


class Categories extends Component {

    state = {
        categories: [],
        phrasesList: [],
        category: {},
        phrase: {},
        openPhrase: false
    };

    getCategoriesList = () => {
        GetAllCategories()
            .then(res => {
                this.setState({
                        categories: res
                    },
                    () => {
                        this.getCategoryById(res[0].id);
                    })
            })
    };

    getCategoryById = (id, index = 0) => {
        // this.props.history.push(`/categories/${id}`);
        this.setState({
            category: this.state.categories[index],
            phrase: {},
            openPhrase: false
        });

        GetAllPhrasesByCategore(id)
            .then(res => {
                this.setState({
                    phrasesList: res
                });
            })
    };

    getPhraseById = (phrase) => {
        // let phraseId = phrase.id,
        //     categoryId = this.state.category.id;
        // console.log(phrase);
        // this.props.history.push(`/categories/${categoryId}/${phraseId}`);
        this.setState({
            phrase: phrase,
            openPhrase: true
        })

    };

    changeCategoryAvatar = img => {
        ChangeCategoryAvatar(img, this.state.category.id)
            .then(res => {
                let newList = this.state.categories.map(item => {
                    if (item.id === res.id) {
                        item = res;
                    }
                    return item
                });

                this.setState({
                    categories: newList,
                    category: res
                })
            })
    };

    changeCategoryName = event => {
        this.setState({
            category: {
                ...this.state.category,
                name: event.target.value
            }
        })

    };

    saveCategoryName = () => {
        ChangeCategoryName(this.state.category);

        // ChangeCategoryName({
        //     id: this.state.category.id,
        //     name: this.state.category.name
        // });
    };

    ChangePhraseAvatar = (img, id) => {
        ChangePhraseAvatar(img, id)
            .then(() => {
            this.getCategoriesList();
        })
    };

    savePhrase = (phrase, newPhrase) => {
        console.log(phrase);
        if (newPhrase) {
            CreatePrase(phrase)
                .then(res => {
                    this.ChangePhraseAvatar(phrase.image, res.id);
                    this.setState({openPhrase: false});
                    console.log(res);
                })
        } else {
            UpdatePrase(phrase)
                .then(() => {
                    this.ChangePhraseAvatar(phrase.image, phrase.id);
                    this.setState({openPhrase: false});
                })
        }
    };

    removePhrase = (id, index) => {
        RemovePrase(id)
            .then(() => {
                this.getCategoriesList();
                // let updatePhrasesList = this.state.phrasesList;
                // updatePhrasesList.splice(index, 1);
                // this.setState({phrasesList: updatePhrasesList});
            })
    };

    backCategory = () => {
        // this.props.history.push(`/categories/${this.state.category.id}`);
        this.setState({
            phrase: {},
            openPhrase: false
        })
    };

    renderCategory = () => {
        if (this.state.openPhrase) {
            return (
                <Phrase
                    phrase={this.state.phrase}
                    backCategory={this.backCategory}
                    category={this.state.category}
                    save={this.savePhrase}
                />
            )
        } else {
            return (
                <Category
                    phrases={this.state.phrasesList}
                    category={this.state.category}
                    changeName={this.changeCategoryName}
                    saveName={this.saveCategoryName}
                    changeAvatar={this.changeCategoryAvatar}
                    getPhrase={this.getPhraseById}
                    addPhrase={() => this.setState({openPhrase: true})}
                    remove={this.removePhrase}
                />
            )
        }
    };

    componentDidMount() {
        this.getCategoriesList();
    };

    render() {
        return (
            <Fragment>
                <CategoriesList
                    categories={this.state.categories}
                    clickevent={this.getCategoryById}
                />

                {this.renderCategory()}
            </Fragment>
        )
    }
}

export default Categories;


