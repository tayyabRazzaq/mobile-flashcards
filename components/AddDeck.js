import React, {Component} from 'react';
import {saveNewDeck} from '../actions/decksActions';
import {connect} from 'react-redux';
import styles from '../utils/styles';
import {TouchableOpacity, Text, View, TextInput} from 'react-native';

class AddDeck extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			title: '',
		};
	}
	
	static navigationOptions = {
		title: 'Add Deck'
	};
	
	onSubmit = () => {
		const decks = this.props.decksReducer.get('decks');
		const {title} = this.state;
		if (title in decks) {
			return;
		}
		this.props.saveNewDeck(title).then(() => {
			this.setState({title: ''});
			const {goBack} = this.props.navigation;
			goBack();
		});
	};
	
	render() {
		const {title} = this.state;
		return (
			<View style={styles.container}>
				<View>
					<TextInput
						style={styles.inputField}
						value={title}
						placeholder="enter deck title"
						clearButtonMode="while-editing"
						onChangeText={text => this.setState({title: text})}
					/>
				</View>
				<View>
					<TouchableOpacity
						onPress={this.onSubmit}
						style={{...styles.regularBtn, ...styles.addCardBtn}}>
						<Text style={styles.addCardBtn}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({decksReducer}) => ({decksReducer});

const mapDispatchToProps = dispatch => ({
	saveNewDeck: title => dispatch(saveNewDeck(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
