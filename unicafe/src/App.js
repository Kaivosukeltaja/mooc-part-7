import React from 'react';
import { connect } from 'react-redux'
import Button from './components/Button';
import { goodAction, okAction, badAction, zeroAction } from './actions/actions'
import Statistics from './components/Statistics';

export const App = (props) => (
  <div>
    <h1>Anna palautetta</h1>
    <Button text="Hyvä" onClick={props.goodAction} />
    <Button text="Neutraali" onClick={props.okAction} />
    <Button text="Huono" onClick={props.badAction} />
    <Statistics votes={props.votes} />
    <Button text="Nollaa tilastot" onClick={props.zeroAction} />
  </div>
);

const mapDispatchToProps = {
  goodAction,
  okAction,
  badAction,
  zeroAction,
}

const mapStateToProps = state => ({
  votes: {
    good: state.good,
    neutral: state.ok,
    bad: state.bad
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
