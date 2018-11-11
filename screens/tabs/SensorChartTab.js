/*
 * Author: Phan Hong Nam
 * Email: idlogin97@gmail.com
 * University: Ha Noi University Of Industry
 * Green House Sensor Chart Tab
*/
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Dropdown }from 'react-native-material-dropdown';
import GHLineChart from './GHLineChart';
import GHBarChart from './GHBarChart';

class Splash extends Component {
  render() {
    return(
      <View style={{
        flex: 1, 
        backgroundColor: 'white', 
        justifyContent: 'center', 
        alignItems: 'center'}}>
         <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
}

class DayCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data, 
      labels: this.props.label
    }
    this.props.onRendered(false);
  }

  componentDidMount = () => {
    this.props.onRendered(true);
  }

  render () {
    const dataAndLabels = this.state;
    return (
      <View>
        <GHLineChart data={dataAndLabels.data} labels={dataAndLabels.labels} />
        <GHLineChart data={dataAndLabels.data} labels={dataAndLabels.labels} />
        <GHLineChart data={dataAndLabels.data} labels={dataAndLabels.labels} />
        <GHLineChart data={dataAndLabels.data} labels={dataAndLabels.labels} />
        <GHLineChart data={dataAndLabels.data} labels={dataAndLabels.labels} />
        <GHLineChart data={dataAndLabels.data} labels={dataAndLabels.labels} />
      </View>
    )
    
  }
}

class MonthCharts extends Component {
  constructor(props) {
    super(props);
    this.props.onRendered(false);
  }

  componentDidMount = () => {
    this.props.onRendered(true);
  }
  render() {
    return (
      <View>
        <GHBarChart />
        <GHBarChart />
        <GHBarChart />
        <GHBarChart />
        <GHBarChart />
        <GHBarChart />
      </View>
    )
  }
}

class ToggleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartFinishRender: false, 
      chartType: 'day'
    }

    setTimeout(() => {
      this.setState({chartFinishRender: true});
    }, 500);
  }

  componentWillReceiveProps = (props) => {
    console.log(props.onChangeChartType);
    this.setState({chartType: props.onChangeChartType});
  }

  _onChildRendered = (rendered) => {
    this.setState({chartFinishRender: rendered});
  }

  render() {
    const finish = this.state;
    console.log(finish.chartType);
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
                        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [23, 45, 97, 14, 34, 80, 34, 45, 43, 33, 21, 50];
    let screen = finish.chartFinishRender == false ? 
                  <Splash /> :
                  finish.chartType == 'day' ? 
                  <DayCharts onRendered={this._onChildRendered} data={data} labels={labels}/> : 
                  <MonthCharts onRendered={this._onChildRendered} />
    return screen;
  }
}

export default class SensorChartTab extends Component {
    constructor(props) {
      super(props);
      this.state = {
        chartType: 'day', 
        chartFinishRender: false
      }
    };

    _onChangeDropDown = (value, index, data) => {
      if (index == 0)
        this.setState({chartType: 'day'});
      else if (index == 1)
        this.setState({chartType: 'month'});
      console.log(this.state.chartType);
    };

    render() {
        let chartType = [{
        value: 'Ngày',
      }, {
        value: 'Tháng',
      }];
      const finish = this.state;

      let selectScreen = finish.chartType;

      return (
        <View style={styles.container}>
          <View style={styles.selectChart}>
            <Dropdown
              label='Chọn biểu đồ'
              data={chartType}
              onChangeText={this._onChangeDropDown}
              animationDuration={50}
            />
          </View>
          <View style={styles.charts}>
            <ScrollView>
              <ToggleScreen onChangeChartType={selectScreen} />
            </ScrollView>
          </View> 
      </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 5, 
    paddingVertical: 5
  }, 

  selectChart: {
    flex: 1, 
    marginBottom: 10
  }, 

  charts: {
    flex: 8
  }, 

  chart: {
		width: 200,
		height: 200,
	},
})