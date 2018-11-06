import React, {Component, Fragment} from 'react';

import QuestionsList from '../components/QuestionsList';
import Question from '../components/Question';
import {GetAllQuestions} from '../actions/faq';
import {RemoveQuestion} from '../actions/faq';
import {UpdateQuestion} from '../actions/faq';


class Faq extends Component {

    state = {
        questions: [],
        question: {}
    };

    getQuestion = type => {
        GetAllQuestions(type)
            .then(res => {
                this.setState({
                        questions: res
                    },
                    () => {
                        this.openQuestion(this.state.questions[0])
                    })
            })
    };

    removeQuestion = (id, index) => {
        RemoveQuestion(id)
            .then(() => {
                let updateList = this.state.questions;
                updateList.splice(index, 1);
                this.setState({
                        questions: updateList
                    },
                    () => {
                        if (this.state.question.id === id) {
                            this.openQuestion(updateList[0])
                        }
                    })
            })
    };

    updateQuestion = () => {
        if (this.props.match.params.type === 'not_published') {
            let question = this.state.question;
            question.published = true;
            UpdateQuestion(question)
                .then(() => {
                    this.getQuestion(this.props.match.params.type);
                })
        } else {
            UpdateQuestion(this.state.question)
                .then(() => {
                    this.getQuestion(this.props.match.params.type);
                });
        }
    };

    openQuestion = item => {
        // this.props.history.push(`/faq/${this.props.match.params.type}/${item.id}`);
        this.setState({
            question: item
        })
    };

    handleChange = name => event => {
        this.setState({
            question: {
                ...this.state.question,
                [name]: event.target.value
            }
        });
    };

    componentWillReceiveProps(nextProps) {
        this.getQuestion(nextProps.match.params.type);
    }

    componentDidMount() {
        this.getQuestion(this.props.match.params.type);
    };

    render() {
        return (
            <Fragment>
                <QuestionsList
                    questions={this.state.questions}
                    title={this.props.match.params.type === 'published' ? 'Published' : 'Not published'}
                    open={this.openQuestion}
                    remove={this.removeQuestion}
                />

                <Question
                    question={this.state.question}
                    handleChange={this.handleChange}
                    button={this.props.match.params.type === 'published' ? 'Save' : 'Publish'}
                    answer={this.updateQuestion}
                />
            </Fragment>
        )
    }
}

export default Faq;


