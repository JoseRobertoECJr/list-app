import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HeaderColor } from '@ionic-native/header-color';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newItemLabel: string;
	items: any[];
	itemKey: number;

  constructor(public navCtrl: NavController, private storage: Storage, private headerColor: HeaderColor) {
  	this.items = [];
  	this.itemKey = 0;
    this.headerColor.tint('#488aff');
  }

  ionViewDidLoad(){
  	this.storage.forEach((item, index) => {
  		this.items.push(item)
  		if(this.itemKey < item.id){
        this.itemKey = item.id;
      }
  	})
  }

  addItem(){
    console.log(this.newItemLabel);
  	this.storage.set(`${++this.itemKey}`, { id: this.itemKey, label: this.newItemLabel })
  	.then(()=> {
  		this.items.push({ id: this.itemKey, label: this.newItemLabel });
  	}).then(() => this.newItemLabel = '');
  }

  removeItem(item){
    this.storage.remove(`${item.id}`)
    .then(() => {
      var index = this.items.indexOf(item);
      console.log(index);
      this.items.splice(index, 1);
      console.log(this.itemKey)
    });
  }

}
