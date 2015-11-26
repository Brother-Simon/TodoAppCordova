﻿module Tabs {
    'use strict';

    export class NavigationController {

        constructor(
            private $ionicHistory: ionic.navigation.IonicHistoryService,
            private $ionicTabsDelegate: ionic.tabs.IonicTabsDelegate,
            private $ionicPlatform: ionic.platform.IonicPlatformService
            ){

            $ionicPlatform.registerBackButtonAction(e => this.checkBack(e), 100);
        }

        public goBack(): void {
            this.$ionicHistory.goBack();
        }

        public checkBack(e: Event) {
            var page = this.$ionicHistory.currentStateName();
            if (page === Constants.Paths.Todos.Base) {
                let nav: any = navigator;
                if (nav.app && nav.app.exitApp) {
                    nav.app.exitApp();
                } else {
                    window.close();
                }
            } else {
                this.goBack();
            }
        }

        private disableSwipe(e: Event) {
            e.stopPropagation();
        }

        public onSwipeLeft() {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() + 1);
        }

        public onSwipeRight() {
            let index: number = this.$ionicTabsDelegate.selectedIndex();
            if (index > 0) {
                this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() - 1);
            }
        }
    }

    angular.module(Constants.Paths.Tabs)
        .controller('navigationController', NavigationController);

} 

