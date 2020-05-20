/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Groups service.
 */
@Injectable({
    providedIn: 'root'
})
export class GroupsService {
  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * @param {any} filterBy Properties by which entries should be filtered.
   * @param {string} orderBy Property by which entries should be sorted.
   * @param {string} sortOrder Sort order: ascending or descending.
   * @param {number} offset Page offset.
   * @param {number} limit Number of entries within the page.
   * @returns {Observable<any>} Groups.
   */
  getGroups(filterBy: any, orderBy: string, sortOrder: string, offset: number, limit: number): Observable<any> {
    let httpParams = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('sortOrder', sortOrder)
      .set('orderBy', orderBy)
      .set('paged', 'true');
    // filterBy: name
    filterBy.forEach(function (filter: any) {
      if (filter.value) {
        console.log(filter.value);
        httpParams = httpParams.set(filter.type, filter.value);
      }
    });
    return this.http.get('/groups', { params: httpParams });
  }

    /**
     * @param {number} officeId Office Id of office to get groups for.
     * @returns {Observable<any>}
     */
    getGroupsByOfficeId(officeId: number): Observable<any> {
        const httpParams = new HttpParams().set('officeId', officeId.toString());
        return this.http.get('/groups', { params: httpParams } );
    }

    /**
     * @param groupId Group Id of group to get data for.
     * @returns {Observable<any>} Group data.
     */
    getGroupData(groupId: string): Observable<any> {
      const httpParams = new HttpParams().set('associations', 'all');
      return this.http.get(`/groups/${groupId}`, { params: httpParams });
    }

    /**
     * @param groupId Group Id of group to get data for.
     * @returns {Observable<any>} Group Summary data.
     */
    getGroupSummary(groupId: string): Observable<any> {
      const httpParams = new HttpParams().set('R_groupId', groupId)
        .set('genericResultSet', 'false');
      return this.http.get(`/runreports/GroupSummaryCounts`, { params: httpParams });
    }

    /**
     * @param groupId Group Id of group to get data for.
     * @returns {Observable<any>} Group Accounts data.
     */
    getGroupAccountsData(groupId: string): Observable<any> {
      return this.http.get(`/groups/${groupId}/accounts`);
    }

    /**
     * @param groupId Group Id of group to get data for.
     * @returns {Observable<any>} Group Notes data.
     */
    getGroupNotes(groupId: string): Observable<any> {
      return this.http.get(`/groups/${groupId}/notes`);
    }

    /**
     * @param groupId Group Id of group to create note for.
     * @param noteData Note Data.
     * @returns {Observable<any>}
     */
    createGroupNote(groupId: string, noteData: any): Observable<any> {
      return this.http.post(`/groups/${groupId}/notes`, noteData);
    }

    /**
     * @param groupId Group Id of group to edit note for.
     * @param noteId Note Id
     * @param noteData Note Data
     */
    editGroupNote(groupId: string, noteId: string, noteData: any) {
      return this.http.put(`/groups/${groupId}/notes/${noteId}`, noteData);
    }

    /**
     * @param groupId Group Id of group to delete note for.
     * @param noteId Note Id
     */
    deleteGroupNote(groupId: string, noteId: string) {
      return this.http.delete(`/groups/${groupId}/notes/${noteId}`);
    }

}
