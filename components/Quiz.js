import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  mutedText: {
    color: '#999'
  },
  toggleButton: {
    marginBottom: 20,
    width: 160,
    alignItems: 'center',
    backgroundColor: '#32A7F4',
    width: 300
  },
  correctButton: {
    marginBottom: 20,
    width: 160,
    alignItems: 'center',
    backgroundColor: 'green',
    width: 300
  },
  incorrectButton: {
    width: 160,
    alignItems: 'center',
    backgroundColor: 'red',
    width: 300
  },
  buttonText: {
    padding: 10,
    color: 'white'
  }
});

export default class Deck extends React.Component {
  state = {
    mainTextProperty: 'question',
    currentQuestion: 0,
    score: 0,
    showScore: false
  }

  toggle = () => {
    this.setState(state => ({
      ...state,
      mainTextProperty: state.mainTextProperty === 'question' ? 'answer' : 'question'
    }));
  }

  castVote = (vote) => {
    const showScore = this.state.currentQuestion + 1 >= this.props.deck.questions.length;

    this.setState(state => ({
      ...state,
      mainTextProperty: 'question',
      score: state.score + (vote === 'correct' ? 1 : 0),
      currentQuestion: state.currentQuestion + (showScore ? 0 : 1),
      showScore
    }));
  }

  render() {
    const { navigation } = this.props;
    console.log(this.state, this.props);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <Text style={[styles.mutedText, { fontSize: 30 }]}>
            {`${this.state.currentQuestion + 1}/${this.props.deck.questions.length}`}
          </Text>
        </View>
        {!this.state.showScore &&
          <View style={styles.container}>
            <Text style={{ fontSize: 30, marginBottom: 5 }}>
              {this.props.deck.questions[this.state.currentQuestion][this.state.mainTextProperty]}
            </Text>
            <Text style={[styles.mutedText, { marginBottom: 30 }]}>
              {this.state.mainTextProperty[0].toUpperCase() + this.state.mainTextProperty.slice(1)}
            </Text>
            <TouchableOpacity onPress={() => this.toggle()}>
              <View style={styles.toggleButton}>
                <Text style={styles.buttonText}>Flip</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.castVote('correct')}>
              <View style={styles.correctButton}>
                <Text style={styles.buttonText}>Correct</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.castVote('incorrect')}>
              <View style={styles.incorrectButton}>
                <Text style={styles.buttonText}>Incorrect</Text>
              </View>
            </TouchableOpacity>
          </View>}
        {this.state.showScore &&
          <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>
              {`You got ${this.state.score} out of ${this.props.deck.questions.length} questions correct!`}
            </Text>
          </View>}
      </View>
    );
  }
};