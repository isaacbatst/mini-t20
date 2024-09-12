import {ArcanistPathWizard} from '../ArcanisPathWizard';
import {type ArcanistPath, ArcanistPathName} from '../ArcanistPath';
import {ArcanistPathHandler, type ArcanistPathHandlerRequest} from './ArcanistPathHandler';

export class ArcanistPathHandlerWizard extends ArcanistPathHandler {
	public override handle(request: ArcanistPathHandlerRequest): ArcanistPath {
		return new ArcanistPathWizard();
	}

	protected override shouldHandle(request: ArcanistPathHandlerRequest): boolean {
		return request.path === ArcanistPathName.wizard;
	}
}
