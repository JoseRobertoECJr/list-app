import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newItemLabel: string;
	items: any[];
	itemKey: number;

  constructor(public navCtrl: NavController, private storage: Storage) {
  	this.items = [];
  	this.itemKey = 0;

  }

  ionViewDidLoad(){
  	this.storage.forEach((item, index) => {
  		this.items.push(item)
  		this.itemKey++;
  	})
  }

  addItem(){
    console.log(this.newItemLabel);
  	this.storage.set(this.itemKey, { id: this.itemKey, label: this.newItemLabel })
  	.then(()=> {
  		this.items.push({ id: this.itemKey, label: this.newItemLabel });
  		this.itemKey++;
  	}).then(() => this.newItemLabel = '');
  }

  removeItem(item){
    this.storage.remove(`${item.id}`)
    .then(() => { 
      var index = this.items.indexOf(item);
      console.log(index);
      this.items.splice(index, 1);
      this.itemKey--;
      console.log(this.itemKey)
    });
  }

}
