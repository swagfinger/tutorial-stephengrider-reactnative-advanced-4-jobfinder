import React, { useState, useRef, useEffect } from 'react';
import {
  PanResponder,
  Animated,
  View,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCALE = 1.5;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25; //distance card needs to be dragged
const SWIPEOUT_DURATION = 250; //milliseconds

const Swipe = ({
  renderCard,
  data,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  renderNoMoreCards = () => {},
  keyProp = 'id'
}) => {
  //always update on update
  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.spring();
    }
  });

  useEffect(() => {
    setSwipeIndex(0);
  }, [data]);

  //track card index
  const [swipeIndex, setSwipeIndex] = useState(0);

  //swipeIndexRef
  const swipeIndexRef = React.useRef();
  React.useEffect(() => {
    swipeIndexRef.current = swipeIndex;
  }, [swipeIndex]);

  //panresponder
  const panResponder = useRef(
    PanResponder.create({
      //user taps/presses down on screen AND should this pan responder handle the event
      onStartShouldSetPanResponder: () => true,

      //when user starts dragging. gesture has info about what user is doing with finger, and speed its moving
      //when user stops dragging, gesture becomes 0 unless saved
      //dx
      //dy
      //moveX
      //moveY
      //wont need Animated.spring as we set x,y manually
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },

      //when user stops dragging/releases button
      onPanResponderRelease: (event, gesture) => {
        console.log('swipeIndexRef.current: ', swipeIndexRef.current);
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log('swipe RIGHT');
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('swipe LEFT');
          forceSwipe('left');
        } else {
          resetPosition();
        }
      }
    })
  ).current;

  //OPTIMIZATION: useRef so same reference on re-render
  const position = useRef(new Animated.ValueXY()).current;

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

    //duration is millisec
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPEOUT_DURATION,
      useNativeDriver: false
    }).start(() => {
      //executes after animation completed
      onSwipeComplete(direction);
    });
  };

  const getCardStyle = () => {
    //interpolates goal is to tie input (x) with output (rotation)
    //association of one scale, with another scale: input vs output
    //Dimensions gets dimensions of screen
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * SCALE, 0, SCREEN_WIDTH * SCALE],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  const onSwipeComplete = (direction) => {
    console.log('START swipeIndex: ', swipeIndexRef.current);
    const item = data[swipeIndexRef.current]; //the item just swiped

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

    position.setValue({ x: 0, y: 0 });
    setSwipeIndex((prev) => {
      return prev + 1;
    });
  };

  const resetPosition = () => {
    console.log('resetPosition');
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start();
  };

  const renderCards = () => {
    //if index is greater than data.length
    if (swipeIndex >= data.length) {
      return renderNoMoreCards();
    }

    const deck = data.map((item, i) => {
      //dont render any thats already done swipped
      if (i < swipeIndex) {
        return null;
      }

      //current card
      if (i === swipeIndex) {
        return (
          <Animated.View
            key={item[keyProp]}
            style={[getCardStyle(), styles.cardStyle]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }

      //cards in queue
      return (
        <Animated.View
          key={item[keyProp]}
          style={[styles.cardStyle, { top: 10 * (i - swipeIndex), zIndex: -i }]}
        >
          {renderCard(item)}
        </Animated.View>
      );
    });

    return Platform.OS === 'android' ? deck : deck.reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

export default Swipe;
