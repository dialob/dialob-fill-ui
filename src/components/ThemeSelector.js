/**
 *  Copyright 2016 ReSys OÜ
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import {connect} from 'react-redux';
import {setTheme} from '../actions/Actions';
import classnames from 'classnames';

const THEMES = [
 {
   name: 'Custom',
   styleClass: 'has-ui-branded'
 },
 {
   name: 'Regular',
   styleClass: 'has-ui-regular'
 },
 {
   name: 'Material UI',
   styleClass: 'has-ui-mui'
 }
];

class ThemeSelector extends React.Component {

    changeTheme(event) {
      this.props.setTheme(event.target.value);
    }

    render() {
       let theme = this.props.theme.get('selectedTheme') ? this.props.theme.get('selectedTheme') : 'has-ui-branded';
       return (
        <div className='dialob-theme-selector'>
          <label for='dlb-theme-select'>Pick a theme:</label>
          <select id='dlb-theme-select' value={theme} onChange={this.changeTheme.bind(this)}>
            {THEMES.map((t, i) => <option key={i} value={t.styleClass}>{t.name}</option>)}
          </select>
        </div>
       );
    }
}

const ThemeSelectorConnected = connect(
    state => {
        return {
          theme: state.theme
        };
    },
    {
      setTheme
    }
)(ThemeSelector);


export {
    ThemeSelectorConnected as default,
    ThemeSelector
};
