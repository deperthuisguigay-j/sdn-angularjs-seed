import { Component } from 'ng-transition/core';

import template from 'app/admin/users.component.tpl';

@Component({
    selector: 'users',
    templateUrl: template.name
})
export class UsersComponent {

    /* @ngInject */
    constructor($log) {
        $log.debug('users!');
    }
}
