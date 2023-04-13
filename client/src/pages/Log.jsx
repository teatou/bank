import React, { useContext, useState } from 'react'
import '../styles/Log.css'
import { Context } from "../main";
import { observer } from 'mobx-react-lite';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode,
            store: this.props.store
        }
    }
    toggleMode() {
        var newMode = this.state.mode === 'login' ? 'signup' : 'login';
        this.setState({ mode: newMode});
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.mode === 'login') {
            const number = e.target.number.value
            const password = e.target.password.value
            this.state.store.login(number, password)
        } else {
            const firstName = e.target.firstName.value
            const lastName = e.target.lastName.value
            const createPassword = e.target.lastName.value
            const repeatPassword = e.target.lastName.value
            if (createPassword === repeatPassword) {
                this.state.store.signup(firstName, lastName, createPassword)
            }
        }
    }

    render() {
        return (
            <div>
                <div className={`form-block-wrapper`} ></div>
                <section className={`form-block form-block--is-${this.state.mode}`}>
                    <header className="form-block__header">
                        <h1>{this.state.mode === 'login' ? 'Log in' : 'Sign up'}</h1>
                        <div className="form-block__toggle-block">
                            <span>{this.state.mode === 'login' ? 'Don\'t' : 'Already'} have an account? &#8594;</span>
                            <input id="form-toggler" type="checkbox" onClick={this.toggleMode.bind(this)} />
                            <label htmlFor="form-toggler"></label>
                        </div>
                    </header>
                    <LoginForm mode={this.state.mode} onSubmit={(e) => this.handleSubmit(e)} />
                </section>
            </div>
        )
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <form onSubmit={this.props.onSubmit}>
            <div className="form-block__input-wrapper">
                <div className="form-group form-group--login">
                    <Input type="text" name="number" id="number" label="card number" disabled={this.props.mode === 'signup'}/>
                    <Input type="password" name="password" id="password" label="password" disabled={this.props.mode === 'signup'}/>
                </div>
                <div className="form-group form-group--signup">
                    <Input type="text" name="firstName" id="firstName" label="first name" disabled={this.props.mode === 'login'} />
                    <Input type="text" name="lastName" id="lastName" label="last name" disabled={this.props.mode === 'login'} />
                    <Input type="password" name="createPassword" id="createpassword" label="password" disabled={this.props.mode === 'login'} />
                    <Input type="password" name="repeatPassword" id="repeatpassword" label="repeat password" disabled={this.props.mode === 'login'} />
                </div>
            </div>
            <button className="button button--primary full-width" type="submit">{this.props.mode === 'login' ? 'Log In' : 'Sign Up'}</button>
        </form>
        )
    }
}

const Input = ({ id, type, label, disabled, name }) => (
    <input className="form-group__input" type={type} id={id} placeholder={label} disabled={disabled} name={name}/>
);

const Log = () => {
    const {store} = useContext(Context)
    const [mode] = useState('login')

    return (
        <div className={`app app--is-${mode}`}>
            <LoginComponent mode={mode} store={store}/>
        </div>
    )
}

export default observer(Log)
