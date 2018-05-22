/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for isthmus-invoice', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be isthmus-invoice', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('isthmus-invoice');
    })
  });

  it('network-name should be isthmus-network@0.0.10',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('isthmus-network@0.0.10.bna');
    });
  });

  it('navbar-brand should be isthmus-invoice',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('isthmus-invoice');
    });
  });

  
    it('Invoice component should be loadable',() => {
      page.navigateTo('/Invoice');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Invoice');
      });
    });

    it('Invoice table should have 12 columns',() => {
      page.navigateTo('/Invoice');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  
    it('InvoiceDiscount component should be loadable',() => {
      page.navigateTo('/InvoiceDiscount');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('InvoiceDiscount');
      });
    });

    it('InvoiceDiscount table should have 9 columns',() => {
      page.navigateTo('/InvoiceDiscount');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ClientAccount component should be loadable',() => {
      page.navigateTo('/ClientAccount');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ClientAccount');
      });
    });

    it('ClientAccount table should have 4 columns',() => {
      page.navigateTo('/ClientAccount');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Technical component should be loadable',() => {
      page.navigateTo('/Technical');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Technical');
      });
    });

    it('Technical table should have 8 columns',() => {
      page.navigateTo('/Technical');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Financial component should be loadable',() => {
      page.navigateTo('/Financial');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Financial');
      });
    });

    it('Financial table should have 9 columns',() => {
      page.navigateTo('/Financial');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  
    it('Issuer component should be loadable',() => {
      page.navigateTo('/Issuer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Issuer');
      });
    });

    it('Issuer table should have 8 columns',() => {
      page.navigateTo('/Issuer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Debtor component should be loadable',() => {
      page.navigateTo('/Debtor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Debtor');
      });
    });

    it('Debtor table should have 11 columns',() => {
      page.navigateTo('/Debtor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('AcceptDescountInvoice component should be loadable',() => {
      page.navigateTo('/AcceptDescountInvoice');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AcceptDescountInvoice');
      });
    });
  
    it('ApproveDescountInvoice component should be loadable',() => {
      page.navigateTo('/ApproveDescountInvoice');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ApproveDescountInvoice');
      });
    });
  
    it('DescountInvoice component should be loadable',() => {
      page.navigateTo('/DescountInvoice');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('DescountInvoice');
      });
    });
  
    it('CloseInvoice component should be loadable',() => {
      page.navigateTo('/CloseInvoice');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CloseInvoice');
      });
    });
  

});