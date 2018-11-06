import React, {Component, Fragment} from 'react';

import OfferedList from '../components/OfferedList';
import OfferedPhrase from '../components/OfferedPhrase';
import {GetAllOfferedPhrases} from '../actions/phrases';
import {UpdatePrase} from '../actions/phrases';
import {RejectOfferedPhrases} from '../actions/phrases';
import {ApproveOfferedPhrases} from '../actions/phrases';

class OfferedPhrases extends Component {
    state = {
        phrasesList: [],
        phrase: {}
    };

    getAllPhrases = () => {
        GetAllOfferedPhrases()
            .then(res => {
                if (res.length >= 1) {
                    this.setState({phrasesList: res},
                        () => {
                            this.openPhrase(this.state.phrasesList[0])

                        })
                } else {
                    this.setState({phrasesList: [], phrase: {}})
                }

            })
    };

    openPhrase = phrase => {
        this.setState({phrase: phrase})
    };

    updatePhrase = phrase => {
        UpdatePrase(phrase)
            .then(() => {
                if (!phrase.approved) {
                    ApproveOfferedPhrases(phrase.id);
                    this.getAllPhrases();
                }
                this.getAllPhrases();
            })
    };

    rejectPhrase = reason => {
        RejectOfferedPhrases(this.state.phrase.id, reason)
            .then(() => {
                this.getAllPhrases();
            })
    };

    componentDidMount() {
        this.getAllPhrases();
    };

    render() {
        return (
            <Fragment>
                <OfferedList
                    list={this.state.phrasesList}
                    openPhrase={this.openPhrase}
                />

                <OfferedPhrase
                    phrase={this.state.phrase}
                    update={this.updatePhrase}
                    reject={this.rejectPhrase}
                />
            </Fragment>
        )
    }
}

export default OfferedPhrases;
