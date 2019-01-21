import React from 'react';
import { Animated, View } from 'react-native';
import styles from './Spinner.style';

interface IAnimatedCircleParams {
	value: Animated.Value;
	sizes: number[];
}

function AnimatedCircle(params: IAnimatedCircleParams) {
	return(
    <Animated.View
      style = {[
        styles.circle, {
          transform: [{
            scale: params.value.interpolate({
              inputRange: [0, 1, 2],
              outputRange: params.sizes,
            }),
          }],
      }]}
    />
  );
}

interface ISpinnerProps {
	active: boolean;
}

interface ISpinnerState {
  animatedValue: Animated.Value;
}

export class Spinner extends React.Component<ISpinnerProps, ISpinnerState> {
	constructor(props: ISpinnerProps) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0)
    };
	}

	componentWillMount() {
		this.animate();
	}

	setTimingAnimated(originalValue: Animated.Value, newValue: number, duration: number) {
		return Animated.timing(originalValue, {
			toValue: newValue,
			duration: duration,
			useNativeDriver: true,
		});
	}

	animate() {
    Animated.loop(
      Animated.sequence([
        this.setTimingAnimated(this.state.animatedValue, 1, 300),
        this.setTimingAnimated(this.state.animatedValue, 2, 300),
        this.setTimingAnimated(this.state.animatedValue, 1, 300),
        this.setTimingAnimated(this.state.animatedValue, 0, 300),
      ])
    ).start();
	}

	render() {
		return this.props.active ? (
			<View style = { styles.root  }>
				<View style = { styles.circlesContainer }>
					<AnimatedCircle
						value = { this.state.animatedValue }
						sizes = {[ 1.5, 1, 1 ]}
					/>
					<AnimatedCircle
						value = { this.state.animatedValue }
						sizes = {[ 1, 1.5, 1 ]}
					/>
					<AnimatedCircle
						value = { this.state.animatedValue }
						sizes = {[ 1, 1, 1.5 ]}
					/>
				</View>
			</View>
		) : <React.Fragment />;
	}
}