/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

import FactoryMaker from '../../../core/FactoryMaker.js';
import DVBReporting from './reporters/DVBReporting.js';

function ReportingFactory(config) {

    let knownReportingSchemeIdUris = {
        'urn:dvb:dash:reporting:2014': DVBReporting
    };

    let context = this.context;
    let log = config.log;
    let instance;

    function create(entry, rangeController) {
        var reporting;

        try {
            reporting = knownReportingSchemeIdUris[entry.schemeIdUri](context).create();

            reporting.initialize(entry, rangeController);
        } catch (e) {
            reporting = null;

            log(`ReportingFactory: could not create Reporting with schemeIdUri ${entry.schemeIdUri} (${e.message})`);
        }

        return reporting;
    }

    function register(schemeIdUri, moduleName) {
        knownReportingSchemeIdUris[schemeIdUri] = moduleName;
    }

    function unregister(schemeIdUri) {
        delete knownReportingSchemeIdUris[schemeIdUri];
    }

    instance = {
        create:     create,
        register:   register,
        unregister: unregister
    };

    return instance;
}

ReportingFactory.__dashjs_factory_name = 'ReportingFactory';
export default FactoryMaker.getSingletonFactory(ReportingFactory);
