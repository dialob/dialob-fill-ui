import React from 'react';
import classnames from 'classnames';
import Item from './Item';
import {Message, Image} from 'semantic-ui-react';

export default class ImageDisplay extends Item {

    render() {
      let data = [];
      try {
        data = JSON.parse(this.question.get('label'));
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Image config error for item:', this.question.get('id'), e);
        }
        return (<Message negative><p>Check image configuration!</p></Message>);
      }
      let images = data.map((i, n) => <Image key={n} src={i[0]} />);
      return (
        <div className={classnames(this.getStyles())}>
          {images}
        </div>
      );
    }
  }
