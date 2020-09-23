import { ConvertToSpacesPipe } from "./convert-to-spaces.pipe";

describe('ConvertToSpacesPipe', () => {
  it('should display "test string" if the initial string is "test*string"', () => {
    let pipe = new ConvertToSpacesPipe();

    expect(pipe.transform("test*string", '*')).toEqual('test string');
  })

  it('should display "str ng" if the initial string is "string"', () => {
    let pipe = new ConvertToSpacesPipe();

    expect(pipe.transform("string", 'i')).toEqual('str ng');
  })

})
