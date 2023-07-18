import {ResultType} from './PowerSearchResultType'
import {PowerSearchResult} from './PowerSearchResult'
import {PowerSearchParams} from './PowerSearchParams'
import axios from 'axios'
import {randResults} from '../mock/RandomCells'

export interface PowerSearchI {
  type: ResultType;
  name: string;
  params: PowerSearchParams;
  id: string;
  page: number; // This is 1-indexed!
  pageWidth: number; // The server will ensure this is within [1,50]
}

export class PowerSearch implements PowerSearchI {
  onDirtyBitUpdated?: (boolean) => void;
  type: ResultType;
  name: string;
  params: PowerSearchParams;
  id: string;
  page: number; // This is 1-indexed!
  pageWidth: number; // The server will ensure this is within [1,50]
  _isDirty: boolean;

  constructor(onDirtyBitUpdated?: (boolean) => void, params?: PowerSearchI) {
    this.onDirtyBitUpdated = onDirtyBitUpdated
    this.type = "Stories"
    this.name = "Unnamed Search"
    this.id = null;
    this.page = 1; // Pages are 1-indexed!!!
    this.pageWidth = 25;
    this._isDirty = false;
    if (params) {
      this.updateFromJson(params)
    }
  }

  /*
   * Loads a PowerSearch object from ID. Silently returns an empty search if there is a problem.
   */
  static async load(id: string, onDirtyBitUpdated?: (boolean) => void): Promise<PowerSearch> {
    let url = `/api/v1/search/${id}`
    let ret = new PowerSearch(onDirtyBitUpdated);
    try {
      const res = await axios.get(url)    
      const { data: {data: destructuredResults}} = res            
      destructuredResults !== null ? 
        ret.updateFromJson(destructuredResults) : 
        ret.updateFromJson({} as any);
    } catch(ex) {
      console.error('Error:', ex);
    }
    return ret;
  }

  public setResultType(type: ResultType) {
    if (type != this.type) {
      this.type = type;
      this.makeDirty();
    }
  }

  public getResultType() : ResultType {
    return  this.type
  }
  
  public setName(name: string) {
    if (name != this.name) {
      this.name = name;
      this.makeDirty();
    }
    return this;
  }

  public getName(): string {
    return this.name;
  }
  
  public getParams(): unknown {
    return this.params;
  }
  public setParams(json: PowerSearchParams) {
    this.params = json;
    this.makeDirty();

    return this;
  }

  public isDirty(): boolean {
    return this._isDirty;
  }

  public setPage(page: number) {
    this.page = page;
    // Note: I don't think we make it dirty since this doesn't alter a save-able param.
    // But that will require manual search refresh on consumer end of this object!
  }

  public getPage(): number {
    return this.page
  }

  public setPageWidth(pageWidth: number) {
    this.pageWidth = pageWidth;
    // Note: I don't think we make it dirty since this doesn't alter a save-able param.
    // But that will require manual search refresh on consumer end of this object!
  }

  public getPageWidth(): number {
    return this.pageWidth
  }

  _notifyDirty() {
    if (this.onDirtyBitUpdated) {
      this.onDirtyBitUpdated(this)
    }
  }

  public updateFromJson(json: PowerSearchI) {
    if (json) {
      if (json.name) {
        this.name = json.name;
      }
      if (json.params) {
        this.params = json.params;
      }
      if (json.type) {
        this.type = json.type;
      }
      if (json.id) {
        this.id = json.id;
      }
      if (json.page) {
        this.page = json.page
      }
      if (json.pageWidth) {
        this.pageWidth = json.pageWidth
      }
    }
  }

  public makeDirty() {
    if (this._isDirty == false) {
      this._isDirty = true;
      this._notifyDirty()
    }
  }

  public async save(): Promise<void> {
    if (this.isDirty()) {
      let url = `/api/v1/search/upsert`
      let payload = {
        id: this.id,
        name: this.name,
        params: this.params,
        type: this.type
      }    
      let res = await axios.post(url, payload)    
      // Update the (maybe new) ID if it came back to us
      const { data: {data: destructuredResults}} = res            
      destructuredResults !== null ? 
        this.updateFromJson(destructuredResults) : 
        this.updateFromJson({} as any);
      this._isDirty = false;
      this._notifyDirty()    
    }
  }

  public async run(): Promise<PowerSearchResult> {
    let url = `/api/v1/search`
    let payload = {
      id: this.id,
      name: this.name,
      params: this.params,
      type: this.type,
      page: this.page,
      pageWidth: this.pageWidth
    }    
    let res = await axios.post(url, payload)    
    // Update the (maybe new) ID if it came back to us
    console.log("RES", res);
    const { data: destructuredResults} = res            
    return destructuredResults !== null ? 
      destructuredResults as PowerSearchResult : 
      {
        error: "Expected response not returned from server",
        total: 0,
        count: 0,
        index: 0,
        window: 0, 
        schema: [],
        rows: []
      } as PowerSearchResult;
  }
}
